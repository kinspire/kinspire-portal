import { Handler, Parser } from "htmlparser2/lib/Parser";
import { get, map, size, sortBy, zip } from "lodash";
import { Answer, McqQuestion, Question, QuestionType, StoryState } from "../../../schema";
import { MAttempt, MAttemptState, MQuestion, MQuestionType } from "../../../schema/moodle";
import {
  QUIZ_GET_ATTEMPTS,
  QUIZ_START_ATTEMPT,
  QUIZ_GET_ATTEMPT_DATA,
  callFunction,
} from "../webservice";

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
    this.answer = "";

    this.level = -1;
    this.inQtext = false;
    this.qDone = false;
    this.aDone = false;
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
    this.notAnswer = false;
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

export const parseStory = (story: string) => {
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
  return [
    {
      question: "Unknown.",
      type: QuestionType.SHORT,
    },
    {
      answer: "Unknown",
      sequencecheck: 0,
    },
  ];
};

const getMAttempt = async (quizid: number): Promise<MAttempt | null> => {
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
    // Check if it's complete
    attempt = get(sortBy(attempts.attempts, "attempt"), "[0]");

    if (attempt.state === MAttemptState.FINISHED) {
      console.log("Found existing attempt to be finished", attempt);

      return null;
    }
  }

  return attempt;
};

// Convert an attempt into an array of strings (the story) and an array of questions
export const getQAFromAttempt = async (quizid: number): Promise<Record<string, any>> => {
  // Identify the attempt id for this quiz
  const attempt = await getMAttempt(quizid);

  // Check for finished attempts
  if (!attempt) {
    return { questions: [], answers: [], state: StoryState.FINISHED };
  }

  // Use the layout to understand the fields in here
  const attemptData = await callFunction(QUIZ_GET_ATTEMPT_DATA, {
    attemptid: attempt.id,
    page: 0,
  });

  const mquestions = attemptData.questions as MQuestion[];
  const qaPairs = map(mquestions, (q) => mquestionToQsAndAs(q));
  // zip takes each array as a parameter
  const [questions, answers] = zip(...qaPairs);

  return { questions, answers, state: StoryState.IN_PROGRESS };
};
