import { ContentService } from "@common/schema";
import { ElectronContentService } from "./electron";

export const service: ContentService = new ElectronContentService();
