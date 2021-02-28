import { Course } from "../../schema";

export enum ContentTypes {
  SET_COURSES = "@@content/SET_COURSES",
}

export interface ContentState {
  courses: Course[];
}
