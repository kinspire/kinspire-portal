import { ContentType } from "../constants";
import { LinkPair } from "../util";

// Content schema

export enum QuestionType {
  MCQ = "mcq",
  SHORT = "short",
  LONG = "long",
}

export interface Question {
  question: string;
  type: QuestionType;
}

export interface McqQuestion extends Question {
  type: QuestionType.MCQ;
  choices: string[];
  correctChoice: number;
}

type Answer = string | number;

export interface Content {
  classLevel: number;
  num: number;
  title: string;
  type: ContentType;
}

export interface Story extends Content {
  type: ContentType.STORY;
  questions: Question[];
  story: string[];
  vocab: string[];
  "translation-te": string[];
  // translation: Record<string, string[]>;
}

export interface ContentProgress {
  answers: string[];
}

export interface ContentService {
  getStories: () => Promise<LinkPair[]>;
  getContent: (c: ContentType, classLevel: number, num: number) => Promise<Content>;
  getContentProgress: (c: ContentType, classLevel: number, num: number) => Promise<ContentProgress>;
  submitContentProgress: (
    c: ContentType,
    classLevel: number,
    num: number,
    answers: { answers: Answer[] }
  ) => Promise<void>;
}
