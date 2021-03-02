import { Course, Section } from "../../schema";

export enum ContentTypes {
  SET_COURSES = "@@content/SET_COURSES",
  SET_SECTIONS = "@@content/SET_SECTIONS",
}

export interface ContentState {
  courses: Course[];
  sections: Record<string, Section[]>;
}
