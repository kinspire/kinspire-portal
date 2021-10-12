import { MCourse, MQuiz, MSection } from "../../../schema/moodle";
import { filter, find, get, map, size } from "lodash";
import {
  callFunction,
  COURSE_GET_CONTENTS,
  ENROL_GET_COURSES,
  QUIZ_GET_QUIZZES_IN_COURSE,
  WEBSERVICE_GET_INFO,
} from "../webservice";
import { Course, ModuleType, Module, Section, StoryContent } from "../../../schema";
import { getQAFromAttempt, parseStory } from "./parser";

// Some constants for now

// always exclude course #1, "KPortal"
// TODO one should be able to extract this from site information as the "front page" course or something similar
const EXCLUDE_COURSE_ID = 1;
// always exclude section 0
const EXCLUDE_SECTION = 0;

// Convert moodle course to Kportal course
const courseMap = (c: MCourse): Course => ({
  id: "" + c.id,
  // TODO remove
  sections: [],
  title: c.fullname,
  shortname: c.shortname,
});

const sectionsMap = (sections: MSection[]): Section[] =>
  map(
    filter(sections, (s) => s.section !== EXCLUDE_SECTION),
    (section) =>
      ({
        id: section.id + "",
        modules: map(
          section.modules,
          (module) =>
            ({
              id: "" + module.id,
              title: module.name,
              content: {},
              moduleType: module.modname === "quiz" ? ModuleType.STORY : "",
            } as Module)
        ),
        title: section.name,
      } as Section)
  );

// Fetch courses for the currently logged-in user
const getMCourses = async () => {
  const { userid } = await callFunction(WEBSERVICE_GET_INFO, {}, true);
  console.log("user id", userid);
  return (await callFunction(ENROL_GET_COURSES, { userid }, true)) as MCourse[];
};

const getModuleHelper = async (courseid: string, sectionid: string, moduleid: string) => {
  const sections = await getSections(courseid);

  const modules = get(
    find(sections, (t) => t.id === sectionid),
    "modules"
  );
  if (size(modules) === 0) {
    // TODO error out
    throw new Error("No modules found");
  }
  return find(modules, (m) => m.id === moduleid);
};

//////////////////////////////////// EXPORTS ////////////////////////////////////

export const getCourses = async () => {
  console.log("moodle get courses called!");
  const mcourses = await getMCourses();
  console.log(mcourses);
  return map(
    filter(mcourses, (c) => c.id !== EXCLUDE_COURSE_ID),
    (c) => courseMap(c)
  );
};

export const getSections = async (courseId: string) => {
  console.log("moodle get sections called!");
  const msections = await callFunction(COURSE_GET_CONTENTS, { courseid: courseId });
  console.log("sections: ", size(msections));
  const mappedSections = sectionsMap(msections);
  console.log(
    map(
      mappedSections,
      (s) => `${s.id}: ${s.title} ${JSON.stringify(map(s.modules, (m) => m.title))}`
    )
  );
  return mappedSections;
};

export const getModule = async (courseId: string, sectionId: string, moduleId: string) => {
  const module = await getModuleHelper(courseId, sectionId, moduleId);

  if (module) {
    // Based on module type return module
    switch (module.moduleType) {
      case ModuleType.STORY:
        // Convert moduleId to quizId
        const quizzesInCourse = await callFunction(QUIZ_GET_QUIZZES_IN_COURSE, {
          "courseids[]": courseId,
        });

        const quiz = find(quizzesInCourse.quizzes as MQuiz[], (q) => q.coursemodule === +moduleId);

        if (!quiz) {
          throw new Error("Can't find quiz");
        }

        // First get story - we can always get that.
        const story = parseStory(quiz.intro);

        // Then try to get qs, as, and current state from the attempt
        const { state, questions, answers } = await getQAFromAttempt(quiz.id);

        module.content = {
          state,
          story,
          questions,
          answers,
          vocab: [],
        } as StoryContent;
        break;
      default:
        console.warn("unknown module!");
        break;
    }
  }

  return module;
};
