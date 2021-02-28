import { action } from "typesafe-actions";
import { Course } from "../../schema";
import { ContentTypes } from "./types";

export const setCourses = (courses: Course[]) => action(ContentTypes.SET_COURSES, courses);
