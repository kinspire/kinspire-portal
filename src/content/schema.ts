import { ContentType } from "../constants";

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

export type Answer = string | number;

export interface Content extends BaseDoc {
  title: string;
}

export interface Story extends Content {
  type: ContentType.STORY;
  questions: Question[];
  story: string[];
  vocab: string[];
  "translation-te": string[];
  // translation: Record<string, string[]>;
}

export interface ContentProgress extends BaseDoc {
  answers: Answer[];
  userId?: string;
}

export interface BaseDoc {
  type: ContentType;
  classLevel: number;
  num: number;
}

export interface ContentService {
  getStories: () => Promise<Content[]>;
  getContent: (c: ContentType, classLevel: number, num: number) => Promise<Content>;
  getContentProgress: (
    c: ContentType,
    classLevel: number,
    num: number
  ) => Promise<ContentProgress | null>;
  submitContentProgress: (cp: ContentProgress) => Promise<void>;
}
