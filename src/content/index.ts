// import { LocalContentService } from "./local";
import { FirebaseContentService } from "./firebase";
import { ContentService } from "./schema";

export const service: ContentService = new FirebaseContentService();

export * from "./schema";
