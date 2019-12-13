import { ContentType } from "../constants";
import { BaseDoc, ContentService, QuestionType, Story } from "./schema";

// Local
const base: BaseDoc = {
  type: ContentType.STORY,
  classLevel: 0,
  num: 0,
};
// const wordSearches = [{ name: "Word Search 1", link: "/activities/wsplay/1/1" }];
const story: Story = {
  ...base,
  "translation-te": [],
  vocab: [],
  questions: [{ question: "Sample Question", type: QuestionType.SHORT }],
  story: ["Line 1", "Line 2"],
  title: "Title",
  type: ContentType.STORY,
};
const stories = [story];
const storyProgress = { answers: ["Sample answer"], ...base };

export class LocalContentService implements ContentService {
  public getStories = async () => stories;
  public getContent = async () => story;
  public getContentProgress = async () => storyProgress;
  public submitContentProgress = async () => {};
}
