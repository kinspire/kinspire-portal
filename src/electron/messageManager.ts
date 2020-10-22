import { ipcMain } from "electron";
import {
  AuthArg,
  AuthArgString,
  ContentArg,
  ContentArgString,
  ElectronRequest,
  Messages,
} from "../common/messages";
import { moodleLogin } from "./moodle/auth";
import { moodleContentService } from "./moodle/content";
import { ApiHelper } from "./moodle/webservice";

export default function register() {
  ipcMain.on(Messages.Ping.REQUEST, (event, arg) => {
    console.log(arg);
    event.reply(Messages.Ping.REPLY, "pong");
  });

  // Register all sublisteners
  registerContentListener();
  registerAuthListener();
}

const service = moodleContentService;

const registerContentListener = () => {
  ipcMain.handle(Messages.Content.REQUEST, async (_event, request: ElectronRequest) => {
    console.log("Content Request", ContentArgString[request.arg], request.data);

    if (request.data.token) {
      if (!ApiHelper.token) {
        console.log("Update token", request.data.token);
      }
      ApiHelper.token = request.data.token;
    }

    switch (request.arg) {
      case ContentArg.GET_COURSES:
        return await service.getCourses();
      case ContentArg.GET_COURSE:
        return await service.getCourse(request.data.courseId);
      case ContentArg.GET_MODULE:
        return await service.getModule(
          request.data.course,
          request.data.section,
          request.data.module
        );
      case ContentArg.SAVE_MODULE:
        return await service.saveModule(
          request.data.course,
          request.data.section,
          request.data.module,
          request.data.answers,
          request.data.submit
        );
    }
  });
};

export const registerAuthListener = () => {
  ipcMain.handle(Messages.Auth.REQUEST, async (_event, request: ElectronRequest) => {
    console.log("Auth Request", AuthArgString[request.arg], request.data);
    switch (request.arg) {
      case AuthArg.LOGIN:
        return await moodleLogin(request.data.username, request.data.password);
    }
  });
};
