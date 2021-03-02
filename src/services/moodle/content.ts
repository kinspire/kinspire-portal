import { MCourse, MSection } from "../../schema/moodle";
import { filter, map, size } from "lodash";
import {
  callFunction,
  COURSE_GET_CONTENTS,
  ENROL_GET_COURSES,
  WEBSERVICE_GET_INFO,
} from "./webservice";
import { Course, ModuleType, Module, Section } from "../../schema";

// Some constants for now

// always exclude course #1, "KPortal"
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
  console.log(userid);
  return (await callFunction(ENROL_GET_COURSES, { userid }, true)) as MCourse[];
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
