import { ContentService } from "./schema";
import { FirebaseContentService } from "./firebase";

export const service: ContentService = new FirebaseContentService();

export * from "./schema";
