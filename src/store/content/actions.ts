import { action } from "typesafe-actions";
import { Course, Section } from "../../schema";
import { ContentTypes } from "./types";

export const setCourses = (courses: Course[]) => action(ContentTypes.SET_COURSES, courses);
export const setSections = (courseId: string, sections: Section[]) =>
  action(ContentTypes.SET_SECTIONS, { courseId, sections });
