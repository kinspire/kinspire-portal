import { MCourse, MSection } from "../../schema/moodle";
import { filter, map } from "lodash";
import { callFunction, ENROL_GET_COURSES, WEBSERVICE_GET_INFO } from "./webservice";
import { Course, ModuleType, Module, Section } from "../../schema";

// Some constants for now

// always exclude course #1, "KPortal"
const EXCLUDE_COURSE_ID = 1;
// always exclude section 0
const EXCLUDE_SECTION = 0;

// Convert moodle course to Kportal course
const courseMap = (c: MCourse, sections: MSection[]): Course => ({
  id: "" + c.id,
  sections: map(
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
  ),
  title: c.fullname,
  shortname: c.shortname,
});

// Fetch courses for the currently logged-in user
const getMCourses = async () => {
  const { userid } = await callFunction(WEBSERVICE_GET_INFO, {}, true);
  console.log(userid);
  return (await callFunction(ENROL_GET_COURSES, { userid }, true)) as MCourse[];
};

export const getCourses = async () => {
  console.log("moodle get courses called!");
  const mcourses = await getMCourses();
  console.log(mcourses);
  return map(
    filter(mcourses, (c) => c.id !== EXCLUDE_COURSE_ID),
    (c) => courseMap(c, [])
  );
};
