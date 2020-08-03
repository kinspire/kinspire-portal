// custom interfaces

export interface LinkPair {
  title: string;
  subtitle?: string;
  link: string;
}

export interface Lesson {
  title: string;
  id: string;
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
}