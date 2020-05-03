import { ContentService, Content, ContentType, ContentProgress } from "@common/schema";
import { ipcRenderer } from "electron-better-ipc";
import { Messages, ContentArg } from "@common/messages";

export class ElectronContentService implements ContentService {
  getStories = async () =>
    (await ipcRenderer.callMain(Messages.Content.REQUEST, {
      arg: ContentArg.GET_STORIES,
    })) as Content[];

  getAllContent = async (type: ContentType) =>
    (await ipcRenderer.callMain(Messages.Content.REQUEST, {
      arg: ContentArg.GET_ALL_CONTENT,
      data: {
        type: type,
      },
    })) as Content[];

  getContent = async (type: ContentType, classLevel: number, num: number) =>
    (await ipcRenderer.callMain(Messages.Content.REQUEST, {
      arg: ContentArg.GET_CONTENT,
      data: {
        type: type,
        classLevel,
        num,
      },
    })) as Content;

  getContentProgress = async (type: ContentType, classLevel: number, num: number) =>
    (await ipcRenderer.callMain(Messages.Content.REQUEST, {
      arg: ContentArg.GET_CONTENT_PROGRESS,
      data: {
        type: type,
        classLevel,
        num,
      },
    })) as ContentProgress;

  submitContentProgress = async (contentProgress: ContentProgress) =>
    (await ipcRenderer.callMain(Messages.Content.REQUEST, {
      arg: ContentArg.SUBMIT_CONTENT_PROGRESS,
      data: {
        contentProgress,
      },
    })) as void;
}
