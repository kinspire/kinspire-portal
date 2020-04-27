import { ContentType } from "../../constants";

// Content schema

////// PIECES //////

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

export type Answer = string | number;

export interface BaseDoc {
  type: ContentType;
  classLevel: number;
  num: number;
}

////// CONTENT //////

export interface Content extends BaseDoc {
  title: string;
}

export interface Story extends Content {
  type: ContentType.STORY;
  questions: Question[];
  story: string[];
  vocab: string[];
  "translation-te"?: string[];
  "translation-ma"?: string[];
  // TODO translation: Record<string, string[]>;
}

export interface WordSearch extends Content {
  type: ContentType.WORD_SEARCH;
  words: string[];
  grid: string[];
}

////// PROGRESS //////

export interface ContentProgress extends BaseDoc {
  answers: any;
  userId?: string;
}

export interface ContentService {
  getStories: () => Promise<Content[]>;
  getAllContent: (c: ContentType) => Promise<Content[]>;
  getContent: (c: ContentType, classLevel: number, num: number) => Promise<Content>;
  getContentProgress: (
    c: ContentType,
    classLevel: number,
    num: number
  ) => Promise<ContentProgress | null>;
  submitContentProgress: (cp: ContentProgress) => Promise<void>;
}
