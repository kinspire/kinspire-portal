import { ipcMain } from "electron";
import { ContentArg, Messages } from "../../common/messages";
import { moodleContentService } from "./moodle";

const service = moodleContentService;

export const registerContentListener = () => {
  ipcMain.handle(Messages.Content.REQUEST, async (event, request) => {
    console.log("[Content] Answer renderer", request);
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
      // divider
      case ContentArg.GET_CONTENT:
        return await service.getContent(
          request.data.type,
          request.data.classLevel,
          request.data.num
        );
      case ContentArg.GET_CONTENT_PROGRESS:
        return await service.getContentProgress(
          request.data.type,
          request.data.classLevel,
          request.data.num
        );
      case ContentArg.SUBMIT_CONTENT_PROGRESS:
        return await service.submitContentProgress(request.data.contentProgress);
      case ContentArg.GET_ALL_CONTENT:
        return await service.getAllContent(request.data.type);
    }
  });
};
