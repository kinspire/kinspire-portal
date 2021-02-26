import { MTok } from "../../schema/moodle";
import querystring from "querystring";
import { apiRequest } from "../util";
import { BASE, WS_NAME } from "./webservice";

export const moodleLogin = async (username: string, password: string) => {
  const tok: MTok = await apiRequest(
    `${BASE}/login/token.php?${querystring.stringify({
      username,
      password,
      service: WS_NAME,
    })}`
  );
  return tok.token;
};
