import querystring from "querystring";
import { apiRequest } from "./util";

// Functions
const WS_FUNCTION = "wsfunction";
export const WS_NAME = "desktop_portal";

export const COURSE_GET_COURSES = "core_course_get_courses";
export const COURSE_GET_CONTENTS = "core_course_get_contents";
export const QUIZ_GET_ATTEMPT_DATA = "mod_quiz_get_attempt_data";
export const QUIZ_START_ATTEMPT = "mod_quiz_start_attempt";
export const QUIZ_GET_ATTEMPTS = "mod_quiz_get_user_attempts";
export const QUIZ_GET_QUIZZES_IN_COURSE = "mod_quiz_get_quizzes_by_courses";
export const QUIZ_SAVE_ATTEMPT = "mod_quiz_save_attempt";

// kinspire.org
// export const BASE = "http://kinspire.org/portal";
// const WS_TOKEN = "99a1a5345fd1bf1ba90324fb9662f59a";
// localhost
export const BASE = "http://localhost:3123";
const WS_TOKEN = "917f2276cc69185e43e4a384b7d98ebb";

export const WS_BASE = `${BASE}/webservice/rest/server.php?wstoken=${WS_TOKEN}&moodlewsrestformat=json&`;

export const callFunction = async (func: string, params?: Record<string, any>) =>
  await apiRequest(`${WS_BASE}${querystring.stringify({ [WS_FUNCTION]: func, ...params })}`);
