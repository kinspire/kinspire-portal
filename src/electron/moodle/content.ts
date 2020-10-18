import { Handler, Parser } from "htmlparser2/lib/Parser";
import { filter, find, get, map, size, sortBy } from "lodash";
import { MAttempt, MCourse, MQuestion, MQuestionType, MQuiz, MSection } from "../../common/moodle";
import {
  ContentService,
  Course,
  McqQuestion,
  Module,
  ModuleType,
  Question,
  QuestionType,
  Section,
} from "../../common/schema";
import {
  ApiHelper,
  COURSE_GET_CONTENTS,
  ENROL_GET_COURSES,
  QUIZ_GET_ATTEMPT_DATA,
  QUIZ_GET_ATTEMPTS,
  QUIZ_GET_QUIZZES_IN_COURSE,
  QUIZ_START_ATTEMPT,
  WEBSERVICE_GET_INFO,
} from "./webservice";

// Some constants for now

// always exclude course #1, "KPortal"
const EXCLUDE_COURSE_ID = 1;
// always exclude section 0
const EXCLUDE_SECTION = 0;

// Convert moodle course to Kportal course
const courseMap = (c: MCourse, sections: MSection[]): Course => ({
  id: "" + c.id,
  sections: map(
    filter(sections, (s) => s.section !== EXCLUDE_SECTION),
    (section) =>
      ({
        id: section.id + "",
        modules: map(
          section.modules,
          (module) =>
            ({
              id: "" + module.id,
              title: module.name,
              content: {},
              moduleType: module.modname === "quiz" ? ModuleType.STORY : "",
            } as Module)
        ),
        title: section.name,
      } as Section)
  ),
  title: c.fullname,
  shortname: c.shortname,
});

// Fetch courses for the currently logged-in user
const getCourses = async () => {
  const { userid } = await ApiHelper.callFunction(WEBSERVICE_GET_INFO);
  return (await ApiHelper.callFunction(ENROL_GET_COURSES, { userid })) as MCourse[];
};

export const moodleContentService: ContentService = {
  getCourses: async () => {
    const mcourses = await getCourses();
    return map(
      filter(mcourses, (c) => c.id !== EXCLUDE_COURSE_ID),
      (c) => courseMap(c, [])
    );
  },

  getCourse: async (id: string) => {
    const [courses, sections]: [MCourse[], MSection[]] = await Promise.all([
      getCourses(),
      ApiHelper.callFunction(COURSE_GET_CONTENTS, { courseid: id }),
    ]);
    const course = find(courses, (c) => "" + c.id === id);
    return courseMap(course, sections);
  },

  getModule: async (courseid: string, sectionid: string, moduleid: string) => {
    const course = await moodleContentService.getCourse(courseid);

    const modules = get(
      find(course.sections, (t) => t.id === sectionid),
      "modules"
    );
    if (size(modules) === 0) {
      // TODO error out
      throw new Error("No modules found");
    }
    const module = find(modules, (m) => m.id === moduleid);

    console.log("module", module);

    // Based on module type return module
    switch (module.moduleType) {
      case ModuleType.STORY:
        // Convert moduleid to quizid
        const quizzesInCourse = await ApiHelper.callFunction(QUIZ_GET_QUIZZES_IN_COURSE, {
          "courseids[]": courseid,
        });

        console.log("quizzes in course", quizzesInCourse);

        const quiz = find(quizzesInCourse.quizzes as MQuiz[], (q) => q.coursemodule === +moduleid);

        if (!quiz) {
          throw new Error("Can't find quiz");
        }

        const [story, questions] = await getStoryFromQuiz(quiz);
        module.content = {
          story,
          questions,
          vocab: [],
        };
        break;
      default:
        console.warn("unknown module!");
        break;
    }

    return module;
  },
};

class StoryHandler implements Partial<Handler> {
  public lines: string[];
  public level: number;
  public inP: boolean;

  constructor() {
    this.lines = [];
    this.level = -1;
    this.inP = false;
  }

  public onopentag(name: string, attribs: Record<string, any>) {
    if (name === "p") {
      this.inP = true;
    }
  }

  public ontext(text: string) {
    if (this.inP) {
      this.lines.push(text);
    }
  }

  public onclosetag(name: string) {
    if (this.inP && name === "p") {
      this.inP = false;
    }
  }
}

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

// Helper to parse general HTML with a handler
const parse = (html: string, handler: Partial<Handler>) => {
  const parser = new Parser(handler);
  parser.write(html);
  parser.end();
};

const parseStory = (story: string) => {
  const handler = new StoryHandler();
  parse(story, handler);
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

// Convert an MQuiz into an array of strings (the story) and an array of questions
const getStoryFromQuiz = async (quiz: MQuiz): Promise<[string[], Question[]]> => {
  // First identify the attempt id for this quiz
  const attempts = await ApiHelper.callFunction(QUIZ_GET_ATTEMPTS, {
    quizid: quiz.id,
    includepreviews: 1,
    status: "all",
  });

  let attempt: MAttempt;
  if (size(attempts.attempts) === 0) {
    // Need to start a new attempt
    const attemptStart = await ApiHelper.callFunction(QUIZ_START_ATTEMPT, { quizid: quiz.id });

    attempt = attemptStart.attempt;
  } else {
    attempt = get(sortBy(attempts.attempts, "attempt"), "[0]");
  }

  // Use the layout to understand the fields in here
  const attemptData = await ApiHelper.callFunction(QUIZ_GET_ATTEMPT_DATA, {
    attemptid: attempt.id,
    page: 0,
  });

  // TODO pipe content through here
  const questions = attemptData.questions as MQuestion[];
  const story = parseStory(quiz.intro);
  const processedQuestions = map(questions, (q) => parseQuestionTextFromHtml(q));

  return [story, processedQuestions];
};
