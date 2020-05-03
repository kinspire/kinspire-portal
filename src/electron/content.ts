import { ipcMain } from "electron-better-ipc";
import { Messages, ContentArg, ContentRequest } from "../common/messages";
import log from "loglevel";
import { WebsiteContentService } from "./website";

const service = new WebsiteContentService();

export const registerContent = () => {
  ipcMain.answerRenderer(Messages.Content.REQUEST, async (request: ContentRequest) => {
    log.debug("Answer renderer", request);
    switch (request.arg) {
      case ContentArg.GET_STORIES:
        return await service.getStories();
      case ContentArg.GET_ALL_CONTENT:
        return await service.getAllContent(request.data.type);
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
    }
  });
};
