import { Handler, Parser } from "htmlparser2/lib/Parser";
import {
  filter,
  find,
  forEach,
  get,
  join,
  map,
  range,
  reduce,
  size,
  sortBy,
  unzip,
  zip,
  unescape,
} from "lodash";
import { MAttempt, MCourse, MQuestion, MQuestionType, MQuiz, MSection } from "../../common/moodle";
import {
  Answer,
  ContentService,
  Course,
  McqQuestion,
  Module,
  ModuleType,
  Question,
  QuestionType,
  Section,
  StoryContent,
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
  QUIZ_PROCESS_ATTEMPT,
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
    const module = await getModuleHelper(courseid, sectionid, moduleid);

    // Based on module type return module
    switch (module.moduleType) {
      case ModuleType.STORY:
        // Convert moduleid to quizid
        const quizzesInCourse = await ApiHelper.callFunction(QUIZ_GET_QUIZZES_IN_COURSE, {
          "courseids[]": courseid,
        });

        const quiz = find(quizzesInCourse.quizzes as MQuiz[], (q) => q.coursemodule === +moduleid);

        if (!quiz) {
          throw new Error("Can't find quiz");
        }

        const [story, questions, answers] = await getStoryFromMQuiz(quiz);
        module.content = {
          story,
          questions,
          answers,
          vocab: [],
        } as StoryContent;
        break;
      default:
        console.warn("unknown module!");
        break;
    }

    return module;
  },

  saveModule: async (
    courseid: string,
    sectionid: string,
    moduleid: string,
    answers: Answer[],
    submit?: boolean
  ) => {
    const module = await getModuleHelper(courseid, sectionid, moduleid);

    switch (module.moduleType) {
      case ModuleType.STORY:
        // Convert moduleid to quizid
        const quizzesInCourse = await ApiHelper.callFunction(QUIZ_GET_QUIZZES_IN_COURSE, {
          "courseids[]": courseid,
        });
        const mquiz = find(quizzesInCourse.quizzes as MQuiz[], (q) => q.coursemodule === +moduleid);
        if (!mquiz) {
          throw new Error("Can't find quiz");
        }
        const mattempt = await getMAttempt(mquiz.id);

        // Prepare submission
        const data: Array<[string, any]> = [];
        // 1. slots
        data.push(["slots", join(range(1, size(answers) + 1), ",")]);

        // 2. answers
        forEach(answers, (a, idx) => {
          // Add value
          data.push([`q${mattempt.id}:${idx + 1}_answer`, a.answer]);
          // Add sequencecheck
          data.push([`q${mattempt.id}:${idx + 1}_:sequencecheck`, a.sequencecheck]);
        });

        const dataObj = reduce(
          data,
          (acc, cur, idx) => {
            acc[`data[${idx}][name]`] = cur[0];
            acc[`data[${idx}][value]`] = cur[1];
            return acc;
          },
          {}
        );

        const params = {
          attemptid: mattempt.id,
          ...dataObj,
        };

        console.log("params:", params);

        // TODO this needs to be a POST so we don't get escaped to hell and back
        await ApiHelper.callFunction(QUIZ_PROCESS_ATTEMPT, params);
        break;
    }

    return true;
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
      this.lines.push(unescape(text));
    }
  }

  public onclosetag(name: string) {
    if (this.inP && name === "p") {
      this.inP = false;
    }
  }
}

// Handles qtext + answer
class ShortHandler implements Partial<Handler> {
  public lines: string[];
  public answer: string;

  public level: number;
  public inQtext: boolean;
  public qDone: boolean;
  public aDone: boolean;

  constructor() {
    this.lines = [];
    this.level = -1;
    this.inQtext = false;
    this.qDone = false;
  }

  public onopentag(name: string, attribs: Record<string, any>) {
    if (this.level >= 0) {
      this.level++;
    }
    if (!this.qDone && name === "div" && attribs.class === "qtext") {
      this.level = 0;
      this.inQtext = true;
    }

    if (
      this.qDone &&
      !this.aDone &&
      name === "input" &&
      (attribs.name as string).endsWith("answer")
    ) {
      this.answer = attribs.value;
      this.aDone = true;
    }
  }

  public ontext(text: string) {
    if (this.inQtext) {
      this.lines.push(unescape(text));
    }
  }

  public onclosetag() {
    if (this.level >= 0) {
      if (this.level === 0) {
        this.qDone = true;
        this.inQtext = false;
      }
      this.level--;
    }
  }
}

// Handles qtext + multiple choices
// 0 = beginning, 1 = in qtext, 2 = done with qtext, 3 = in answer, 4 = done with answer
enum McqState {
  BEGINNING,
  IN_QTEXT,
  DONE_QTEXT,
  IN_ANSWER,
  DONE_ANSWER,
}

class McqHandler implements Partial<Handler> {
  public lines: string[];
  public choices: string[];
  public checked: number[];

  public level: number;
  public state: McqState;
  // indicates if we're in the answer block, but the text we're going to encounter isn't actually
  // answer text. Basically used for the "a." prefix used for answers.
  public notAnswer: boolean;

  constructor() {
    this.lines = [];
    this.choices = [];
    this.level = -1;
    this.state = McqState.BEGINNING;
    this.checked = [];
  }

  public onopentag(name: string, attribs: Record<string, any>) {
    if (this.level >= 0) {
      this.level++;
    }
    if (this.state === McqState.BEGINNING && name === "div" && attribs.class === "qtext") {
      this.level = 0;
      this.state = McqState.IN_QTEXT;
    } else if (this.state === McqState.DONE_QTEXT && name === "div" && attribs.class === "answer") {
      this.level = 0;
      this.state = McqState.IN_ANSWER;
    } else if (this.state === McqState.IN_ANSWER) {
      if (name === "span" && attribs.class === "answernumber") {
        this.notAnswer = true;
      } else if (
        name === "input" &&
        (attribs.name as string).endsWith("answer") &&
        attribs.checked === "checked"
      ) {
        // Uses the fact that the <input> tag is BEFORE the answer
        this.checked.push(this.choices.length);
      }
    }
  }

  public ontext(text: string) {
    if (this.state === McqState.IN_QTEXT) {
      this.lines.push(unescape(text));
    } else if (this.state === McqState.IN_ANSWER && !this.notAnswer && text.trim()) {
      this.choices.push(unescape(text));
    }
  }

  public onclosetag() {
    if (this.level >= 0) {
      if (this.state === McqState.IN_QTEXT && this.level === 0) {
        this.state = McqState.DONE_QTEXT;
      } else if (this.state === McqState.IN_ANSWER && this.level === 0) {
        this.state = McqState.DONE_ANSWER;
      } else if (this.state === McqState.IN_ANSWER && this.notAnswer) {
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

// Convert a moodle question into our question/answer format
const mquestionToQsAndAs = (mq: MQuestion): [Question, Answer] => {
  if (mq.type === MQuestionType.SHORT || mq.type === MQuestionType.LONG) {
    const handler = new ShortHandler();
    parse(mq.html, handler);
    return [
      {
        question: handler.lines.join(" "),
        type: mq.type === MQuestionType.SHORT ? QuestionType.SHORT : QuestionType.LONG,
      },
      {
        answer: handler.answer,
        sequencecheck: mq.sequencecheck,
      },
    ];
  } else if (mq.type === MQuestionType.MULTI) {
    const handler = new McqHandler();
    parse(mq.html, handler);
    return [
      {
        question: handler.lines.join(" "),
        type: QuestionType.MCQ,
        choices: handler.choices,
      } as McqQuestion,
      {
        // TODO: multi select?
        answer: size(handler.checked) > 0 ? handler.checked[0] : -1,
        sequencecheck: mq.sequencecheck,
      },
    ];
  }
};

const getModuleHelper = async (courseid: string, sectionid: string, moduleid: string) => {
  const course = await moodleContentService.getCourse(courseid);

  const modules = get(
    find(course.sections, (t) => t.id === sectionid),
    "modules"
  );
  if (size(modules) === 0) {
    // TODO error out
    throw new Error("No modules found");
  }
  return find(modules, (m) => m.id === moduleid);
};

const getMAttempt = async (quizid: number): Promise<MAttempt> => {
  const attempts = await ApiHelper.callFunction(QUIZ_GET_ATTEMPTS, {
    quizid,
    includepreviews: 1,
    status: "all",
  });

  let attempt: MAttempt;
  if (size(attempts.attempts) === 0) {
    // Need to start a new attempt
    const attemptStart = await ApiHelper.callFunction(QUIZ_START_ATTEMPT, { quizid });

    attempt = attemptStart.attempt;
  } else {
    attempt = get(sortBy(attempts.attempts, "attempt"), "[0]");
  }

  return attempt;
};

// Convert an MQuiz into an array of strings (the story) and an array of questions
const getStoryFromMQuiz = async (quiz: MQuiz): Promise<[string[], Question[], Answer[]]> => {
  // First identify the attempt id for this quiz
  const attempt = await getMAttempt(quiz.id);

  // Use the layout to understand the fields in here
  const attemptData = await ApiHelper.callFunction(QUIZ_GET_ATTEMPT_DATA, {
    attemptid: attempt.id,
    page: 0,
  });

  const mquestions = attemptData.questions as MQuestion[];
  const story = parseStory(quiz.intro);
  const qaPairs = map(mquestions, (q) => mquestionToQsAndAs(q));
  // zip takes each array as a parameter
  const [processedQs, processedAs] = zip(...qaPairs);

  return [story, processedQs as Question[], processedAs as Answer[]];
};
