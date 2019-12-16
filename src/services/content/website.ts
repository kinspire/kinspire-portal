import log from "loglevel";

import { ContentType } from "../../constants";
import { Content, ContentProgress, ContentService } from "./schema";

const USER_ID = "user";

const base = `http://localhost:4001/portal-api`;

export async function apiRequest(uri: string, method = "GET", body?: any) {
  // TODO attach token
  try {
    const res = await fetch(`${base}/${uri}`, {
      body: body
        ? new Blob([JSON.stringify(body, null, 2)], {
            type: "application/json",
          })
        : body,
      mode: "cors",
      method,
    });
    log.debug(await res.clone().text());
    const response = await res.json();
    if (!res.ok) {
      throw response;
    }
    return response;
  } catch (err) {
    log.error("API error. Endpoint:", uri, "Error:", JSON.stringify(err));
    return Promise.reject(err);
  }
}

export class WebsiteContentService implements ContentService {
  public getStories = async () => await apiRequest(`content/?type=${ContentType.STORY}`);

  public getContent = async (c: ContentType, classLevel: number, num: number) => {
    const docs = await apiRequest(`content/?type=${c}&classLevel=${classLevel}&num=${num}`);

    if (docs.length === 0) {
      throw new Error("Invalid class/num");
    }

    return docs[0] as Content;
  };

  public getContentProgress = async (c: ContentType, classLevel: number, num: number) => {
    // TODO userId
    const docs = await apiRequest(`contentProgress/?type=${c}&classLevel=${classLevel}&num=${num}`);

    if (docs.length > 0) {
      return docs[0] as ContentProgress;
    }
    return null;
  };

  public submitContentProgress = async (cp: ContentProgress) => {
    await apiRequest(
      `contentProgress/?type=${cp.type}&classLevel=${cp.classLevel}&num=${cp.num}&userId=${USER_ID}`,
      "PUT",
      { answers: cp.answers }
    );
  };
}
