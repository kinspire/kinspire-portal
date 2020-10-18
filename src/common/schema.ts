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

export enum ModuleType {
  STORY = "story",
}

export interface ContentService {
  getModule: (course: string, section: string, module: string) => Promise<Module>;
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
