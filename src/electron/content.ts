import { ipcMain } from "electron";
import { ContentArg, Messages } from "../common/messages";
import { moodleContentService } from "./moodle/content";
import { ApiHelper } from "./moodle/webservice";

const service = moodleContentService;

export const registerContentListener = () => {
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
    }
  });
};
