import { Handler, Parser } from "htmlparser2/lib/Parser";
import { filter, find, get, map, size, slice, sortBy } from "lodash";
import querystring from "querystring";
import { MAttempt, MCourse, MQuestion, MQuestionType, MSection } from "../../common/moodleSchema";
import {
  ContentProgress,
  ContentService,
  ContentType,
  Course,
  GoodStory,
  Lesson,
  McqQuestion,
  Question,
  QuestionType,
  Story,
  Tier,
} from "../../common/schema";
import { apiRequest } from "../util";

// Some constants for now

// always exclude course #1, "KPortal"
const EXCLUDE_COURSE_ID = 1;
// always exclude section 0 (section ~= tier)
const EXCLUDE_SECTION = 0;

const WS_TOKEN = "99a1a5345fd1bf1ba90324fb9662f59a";

// Functions

const WS_FUNCTION = "wsfunction";

const COURSE_GET_COURSES = "core_course_get_courses";
const COURSE_GET_CONTENTS = "core_course_get_contents";
const QUIZ_GET_ATTEMPT_DATA = "mod_quiz_get_attempt_data";
const QUIZ_START_ATTEMPT = "mod_quiz_start_attempt";
const QUIZ_GET_ATTEMPTS = "mod_quiz_get_user_attempts";
const QUIZ_GET_QUIZZES_IN_COURSE = "mod_quiz_get_quizzes_by_courses";

const BASE = `http://kinspire.org/portal/webservice/rest/server.php?wstoken=${WS_TOKEN}&moodlewsrestformat=json&`;

const callFunction = async (func: string, params?: Record<string, any>) =>
  await apiRequest(`${BASE}${querystring.stringify({ [WS_FUNCTION]: func, ...params })}`);

// Convert moodle course to Kportal course
const courseMap = (c: MCourse, sections: MSection[]): Course => ({
  id: "" + c.id,
  tiers: map(
    filter(sections, (s) => s.section !== EXCLUDE_SECTION),
    (section) =>
      ({
        id: section.id + "",
        modules: [
          // TODO fixed module
          {
            id: "1",
            title: "Level 1",
            lessons: map(
              section.modules,
              (module) =>
                ({
                  id: "" + module.id,
                  title: module.name,
                  content: {},
                } as Lesson)
            ),
          },
        ],
        title: section.name,
      } as Tier)
  ),
  title: c.fullname,
  shortname: c.shortname,
});

export const moodleContentService: ContentService = {
  getCourses: async () => {
    const courses: MCourse[] = await callFunction(COURSE_GET_COURSES);

    return map(
      filter(courses, (c) => c.id !== EXCLUDE_COURSE_ID),
      (c) => courseMap(c, [])
    );
  },

  getCourse: async (id: string) => {
    const [courses, sections]: [MCourse[], MSection[]] = await Promise.all([
      callFunction(COURSE_GET_COURSES),
      callFunction(COURSE_GET_CONTENTS, { courseid: id }),
    ]);
    const course = find(courses, (c) => "" + c.id === id);

    const mapped = courseMap(course, sections);

    return mapped;
  },

  getLesson: async (courseid: string, tierid: string, moduleid: string, lessonid: string) => {
    const course = await moodleContentService.getCourse(courseid);

    const modules = get(
      find(course.tiers, (t) => t.id === tierid),
      "modules"
    );
    if (size(modules) === 0) {
      // TODO error out
      throw "No modules found";
    }
    const module = modules[0];

    const lesson = find(module.lessons, (l) => l.id === lessonid);

    console.log("lesson", lesson);

    // Convert lessonid to quizid
    const quizzesInCourse = await callFunction(QUIZ_GET_QUIZZES_IN_COURSE, {
      "courseids[]": courseid,
    });

    console.log("quizzes in course", quizzesInCourse);

    // remember, "module" in moodle corresponds to lesson
    const quiz = find(quizzesInCourse.quizzes, (q) => q.coursemodule === +lessonid);

    if (!quiz) {
      throw "Can't find quiz";
    }

    const [story, questions] = await getQuizAsStory(quiz.id);
    lesson.content = {
      story,
      questions,
      vocab: [],
    } as GoodStory;

    return lesson;
  },

  getAllContent: async (c: ContentType) => [],
  getContent: async (c: ContentType, classLevel: number, num: number) => {
    // First identify the attempt id for this quiz
    // TODO map classLevel, num -> quizid
    const attempts = await callFunction(QUIZ_GET_ATTEMPTS, {
      quizid: 1,
      includepreviews: 1,
      status: "all",
    });

    let attempt: MAttempt;
    if (size(attempts.attempts) === 0) {
      // Need to start a new attempt
      const attemptStart = await callFunction(QUIZ_START_ATTEMPT, { quizid: 1 });

      attempt = attemptStart.attempt;
    } else {
      attempt = get(sortBy(attempts.attempts, "attempt"), "[0]");
    }

    // Use the layout to understand the fields in here
    const attemptData = await callFunction(QUIZ_GET_ATTEMPT_DATA, {
      attemptid: attempt.id,
      page: 0,
    });

    const questions = attemptData.questions as MQuestion[];
    const story = parseStory(questions[0]);

    // Pages 1-N are the questions
    const processedQuestions = map(slice(questions, 1), (q) => parseQuestionTextFromHtml(q));

    return { classLevel: 1, num: 0, questions: processedQuestions, story } as Story;
  },
  getContentProgress: async (c: ContentType, classLevel: number, num: number) => ({
    answers: [],
    classLevel,
    num,
    type: c,
  }),
  submitContentProgress: async (cp: ContentProgress) => {},
};

// Handles any qtext-only html
class BasicHandler implements Partial<Handler> {
  public lines: string[];
  public level: number;
  public inQtext: boolean;
  public done: boolean;

  constructor() {
    this.lines = [];
    this.level = -1;
    this.inQtext = false;
    this.done = false;
  }

  public onopentag(name: string, attribs: Record<string, any>) {
    if (this.level >= 0) {
      this.level++;
    }
    if (!this.done && name === "div" && attribs.class === "qtext") {
      this.level = 0;
      this.inQtext = true;
    }
  }

  public ontext(text: string) {
    if (this.inQtext) {
      this.lines.push(text);
    }
  }

  public onclosetag() {
    if (this.level >= 0) {
      if (this.level === 0) {
        this.done = true;
        this.inQtext = false;
      }
      this.level--;
    }
  }
}

// Handles qtext + multiple choices
class McqHandler implements Partial<Handler> {
  public lines: string[];
  public choices: string[];
  public level: number;
  // 0 = beginning, 1 = in qtext, 2 = done with qtext, 3 = in answer, 4 = done with answer
  public state: number;
  public notAnswer: boolean;

  constructor() {
    this.lines = [];
    this.choices = [];
    this.level = -1;
    this.state = 0;
  }

  public onopentag(name: string, attribs: Record<string, any>) {
    if (this.level >= 0) {
      this.level++;
    }
    if (this.state === 0 && name === "div" && attribs.class === "qtext") {
      this.level = 0;
      this.state = 1;
    } else if (this.state === 2 && name === "div" && attribs.class === "answer") {
      this.level = 0;
      this.state = 3;
    } else if (this.state === 3 && name === "span" && attribs.class === "answernumber") {
      this.notAnswer = true;
    }
  }

  public ontext(text: string) {
    if (this.state === 1) {
      this.lines.push(text);
    } else if (this.state === 3 && !this.notAnswer && text.trim()) {
      this.choices.push(text);
    }
  }

  public onclosetag() {
    if (this.level >= 0) {
      if (this.state === 1 && this.level === 0) {
        this.state = 2;
      } else if (this.state === 3 && this.level === 0) {
        this.state = 4;
      } else if (this.state === 3 && this.notAnswer) {
        this.notAnswer = false;
      }
      this.level--;
    }
  }
}

// Fully extracts HTML. Could be useful in the future.
/*
class FullHandler implements Partial<Handler> {
  public htmlText: string;
  public level: number;
  public done: boolean;

  constructor() {
    this.htmlText = "";
    this.level = -1;
    this.done = false;
  }

  public onopentag(name: string, attribs: Record<string, any>) {
    if (this.level >= 0) {
      this.level++;
      this.htmlText += `<${name}>`;
    }
    if (!this.done && name === "div" && attribs.class === "qtext") {
      this.level++;
    }
  }

  public ontext(text: string) {
    if (this.level >= 0) {
      this.htmlText += text;
    }
  }

  public onclosetag(name: string) {
    if (this.level >= 0) {
      if (this.level === 0) {
        this.done = true;
      } else {
        this.htmlText += `</${name}>`;
      }
      this.level--;
    }
  }
}
*/

const parse = (html: string, handler: Partial<Handler>) => {
  const parser = new Parser(handler);
  parser.write(html);
  parser.end();
};

const parseStory = (q: MQuestion) => {
  const handler = new BasicHandler();
  parse(q.html, handler);

  return handler.lines;
};

const parseQuestionTextFromHtml = (q: MQuestion): Question => {
  if (q.type === MQuestionType.SHORT || q.type === MQuestionType.LONG) {
    const handler = new BasicHandler();
    parse(q.html, handler);
    return {
      question: handler.lines.join(" "),
      type: q.type === MQuestionType.SHORT ? QuestionType.SHORT : QuestionType.LONG,
    };
  } else if (q.type === MQuestionType.MULTI) {
    const handler = new McqHandler();
    parse(q.html, handler);
    return {
      question: handler.lines.join(" "),
      type: QuestionType.MCQ,
      choices: handler.choices,
    } as McqQuestion;
  }
};

const getQuizAsStory = async (quizid: number): Promise<[string[], Question[]]> => {
  // First identify the attempt id for this quiz
  // TODO map classLevel, num -> quizid
  const attempts = await callFunction(QUIZ_GET_ATTEMPTS, {
    quizid,
    includepreviews: 1,
    status: "all",
  });

  let attempt: MAttempt;
  if (size(attempts.attempts) === 0) {
    // Need to start a new attempt
    const attemptStart = await callFunction(QUIZ_START_ATTEMPT, { quizid });

    attempt = attemptStart.attempt;
  } else {
    attempt = get(sortBy(attempts.attempts, "attempt"), "[0]");
  }

  // Use the layout to understand the fields in here
  const attemptData = await callFunction(QUIZ_GET_ATTEMPT_DATA, {
    attemptid: attempt.id,
    page: 0,
  });

  const questions = attemptData.questions as MQuestion[];

  // "Question" 0 is the story
  const story = parseStory(questions[0]);

  // "Questions" 1-N are the questions
  const processedQuestions = map(slice(questions, 1), (q) => parseQuestionTextFromHtml(q));

  return [story, processedQuestions];
};
