import { Content, ContentProgress, ContentService, ContentType } from "../../common/schema";
import { apiRequest } from "../util";

const USER_ID = "user";

const BASE = `http://kinspire.org/portal-api`;

const webRequest = async (uri: string, method = "GET", body?: any) =>
  await apiRequest(`${BASE}/${uri}`, method, body);

export class WebsiteContentService implements Partial<ContentService> {
  public getCourses = async () => [];

  public getStories = async () => await this.getAllContent(ContentType.STORY);

  public getAllContent = async (c: ContentType) => await webRequest(`content/?type=${c}`);

  public getContent = async (c: ContentType, classLevel: number, num: number) => {
    const docs = await webRequest(`content/?type=${c}&classLevel=${classLevel}&num=${num}`);

    if (docs.length === 0) {
      throw new Error("Invalid class/num");
    }

    return docs[0] as Content;
  };

  public getContentProgress = async (c: ContentType, classLevel: number, num: number) => {
    // TODO userId
    const docs = await webRequest(`contentProgress/?type=${c}&classLevel=${classLevel}&num=${num}`);

    if (docs.length > 0) {
      return docs[0] as ContentProgress;
    }
    return null;
  };

  public submitContentProgress = async (cp: ContentProgress) => {
    await webRequest(
      `contentProgress/?type=${cp.type}&classLevel=${cp.classLevel}&num=${cp.num}&userId=${USER_ID}`,
      "PUT",
      { answers: cp.answers }
    );
  };
}
