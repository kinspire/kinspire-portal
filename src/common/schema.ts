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

export interface Answer {
  answer: string | number;
  sequencecheck: number;
}

export enum ModuleType {
  STORY = "story",
}

export interface BackendService {
  content: ContentService;
  auth: AuthService;
}

export interface AuthService {
  login: () => Promise<void>;
}

export interface ContentService {
  getModule: (course: string, section: string, module: string) => Promise<Module>;
  getCourses: () => Promise<Course[]>;
  getCourse: (id: string) => Promise<Course>;
  submitModule: (
    course: string,
    section: string,
    module: string,
    answers: Answer[]
  ) => Promise<boolean>;
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

// Specializations

export interface StoryContent {
  story: string[];
  questions: Question[];
  answers: Answer[];
  vocab: any[];
}

export interface StoryModule extends Module {
  content: StoryContent;
}
