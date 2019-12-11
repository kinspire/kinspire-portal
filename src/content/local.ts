import { ContentType } from "../constants";
import { ContentService, QuestionType, Story } from "./schema";

// Local
const storyLinks = [{ name: "Story 1", link: "/activities/story/1/1" }];
// const wordSearches = [{ name: "Word Search 1", link: "/activities/wsplay/1/1" }];
const story: Story = {
  type: ContentType.STORY,
  "translation-te": [],
  vocab: [],
  classLevel: 0,
  num: 0,
  questions: [{ question: "Sample Question", type: QuestionType.SHORT }],
  story: ["Line 1", "Line 2"],
  title: "Title",
};
const storyProgress = { answers: ["Sample answer"] };

export class LocalContentService implements ContentService {
  public getStories = async () => storyLinks;
  public getContent = async () => story;
  public getContentProgress = async () => storyProgress;
  public submitContentProgress = async () => {};
}
