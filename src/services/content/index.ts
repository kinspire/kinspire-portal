import { ContentService } from "./schema";
import { WebsiteContentService } from "./website";

export const service: ContentService = new WebsiteContentService();

export * from "./schema";
