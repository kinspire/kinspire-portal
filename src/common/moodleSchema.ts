// This is where the shape of the response for different functions is stored.

// 3-tier architecture

export interface MCourse {
  id: number;
  shortname: string;
  fullname: string;
  summary: string;
}

export interface MSection {
  id: number;
  name: string;
  section: number;
  modules: MModule[];
}

export interface MModule {
  id: number;
  name: string;
  description?: string;
  modname: string; // TODO module enum
}

// Module types:

// - Quiz

export interface MQuiz {
  id: number;
  course: number;
  coursemodule: number;
  name: string;
  intro: string;
}

export interface MAttempt {
  id: number;
  quiz: number;
  userid: number;
  attempt: number;
  uniqueid: number;
}

export enum MQuestionType {
  DESCRIPTION = "description",
  SHORT = "shortanswer",
  LONG = "essay",
  MULTI = "multichoice",
}

export interface MQuestion {
  slot: number;
  type: MQuestionType;
  page: 0;
  html: string;
}

export interface MAttemptDataResponse {
  attempt: MAttempt;
  questions: MQuestion[];
}
