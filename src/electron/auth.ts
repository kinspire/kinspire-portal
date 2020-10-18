import { ipcMain } from "electron";
import querystring from "querystring";
import { AuthArg, Messages } from "../common/messages";
import { MTok } from "../common/moodle";
import { BASE, WS_NAME } from "./moodle/webservice";
import { apiRequest } from "./util";

const login = async (username: string, password: string) => {
  const tok: MTok = await apiRequest(
    `${BASE}/login/token.php?${querystring.stringify({
      username,
      password,
      service: WS_NAME,
    })}`
  );
  return tok.token;
};

export const registerAuthListener = () => {
  ipcMain.handle(Messages.Auth.REQUEST, async (event, request) => {
    console.log("[Auth] Answer renderer", request);
    switch (request.arg) {
      case AuthArg.LOGIN:
        return await login(request.data.username, request.data.password);
    }
  });
};
