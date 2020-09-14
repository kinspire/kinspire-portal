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

////// OLD STYLE CONTENT: TODO DELETE //////

export interface BaseDoc {
  type: ContentType;
  classLevel: number;
  num: number;
}

// The different types of content
// TODO delete
export enum ContentType {
  STORY = "story",
  WORD_SEARCH = "wordsearch",
  TASK = "task",
}

export enum ModuleType {
  STORY = "story",
}

export interface Content extends BaseDoc {
  title: string;
}

// TODO delete
export interface Story extends Content {
  type: ContentType.STORY;
  questions: Question[];
  story: string[];
  vocab: string[];
  "translation-te"?: string[];
  "translation-ma"?: string[];
  // TODO translation: Record<string, string[]>;
}

export interface GoodStory {
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

//////// NEW ARCHITECTURE //////
// custom interfaces

export interface ContentService {
  getAllContent: (c: ContentType) => Promise<Content[]>;
  getModule: (course: string, section: string, module: string) => Promise<Module>;
  getContent: (c: ContentType, classLevel: number, num: number) => Promise<Content>;
  getContentProgress: (
    c: ContentType,
    classLevel: number,
    num: number
  ) => Promise<ContentProgress | null>;
  submitContentProgress: (cp: ContentProgress) => Promise<void>;
  getCourses: () => Promise<Course[]>;
  getCourse: (id: string) => Promise<Course>;
}

export interface Module {
  title: string;
  id: string;
  moduleType?: ModuleType;
  content: any;
}

export interface Section {
  title: string;
  subtitle?: string;
  id: string;
  modules: Module[];
}

export interface Course {
  title: string;
  id: string;
  sections: Section[];
  shortname: string;
}
