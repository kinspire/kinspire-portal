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

// The different types of content
// TODO delete
export enum ContentType {
  STORY = "story",
  WORD_SEARCH = "wordsearch",
  TASK = "task",
}

export enum LessonType {
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
  getLesson: (course: string, tier: string, module: string, lesson: string) => Promise<Lesson>;
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

export interface Lesson {
  title: string;
  id: string;
  lessonType?: LessonType;
  content: any;
}

export interface Module {
  title: string;
  subtitle?: string;
  id: string;
  lessons: Lesson[];
}

export interface Tier {
  title: string;
  subtitle?: string;
  id: string;
  modules: Module[];
}

export interface Course {
  title: string;
  id: string;
  tiers: Tier[];
  shortname: string;
}
