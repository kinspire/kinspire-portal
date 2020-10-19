import { ipcMain } from "electron";
import { AuthArg, ContentArg, Messages } from "../common/messages";
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
  ipcMain.handle(Messages.Content.REQUEST, async (event, request) => {
    console.log("[Content] Answer renderer", request);

    if (request.data.token) {
      console.log("Update token", request.data.token);
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
  ipcMain.handle(Messages.Auth.REQUEST, async (event, request) => {
    console.log("[Auth] Answer renderer", request);
    switch (request.arg) {
      case AuthArg.LOGIN:
        return await moodleLogin(request.data.username, request.data.password);
    }
  });
};
