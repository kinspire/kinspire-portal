import { Course, Module, Section } from "@common/schema";

// Describes a sample course

// sample english course
const breakfastLesson: Module = {
  title: "Gopi eats breakfast!",
  id: "story1-1",
  content: "Gopi gopi gopy",
};
const storiesSection: Section = {
  title: "Stories",
  id: "stories",
  modules: [breakfastLesson],
};
const english: Course = {
  title: "English",
  id: "english",
  shortname: "english",
  sections: [storiesSection],
};

export const courses = [english];
