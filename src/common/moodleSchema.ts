// This is where the shape of the response for different functions is stored.

///// QUIZZES /////

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

// Course --> Course
export interface MCourse {
  id: number;
  shortname: string;
  fullname: string;
  summary: string;
}

// Section --> Tier
export interface MSection {
  id: number;
  name: string;
  section: number;
  modules: MModule[];
}

// ??? --> Module

// Module --> Lesson
export interface MModule {
  id: number;
  name: string;
  modname: string; // TODO module enum
}
