import { find } from "lodash";
import { courses } from "../../common/Sample";
import { BaseDoc, ContentService, ContentType, QuestionType, Story } from "../../common/schema";

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

export const LocalContentService: Partial<ContentService> = {
  getCourses: async () => courses,
  getCourse: async (id: string) => find(courses, (c) => c.id === id),
  getAllContent: async () => stories,
  getContent: async () => story,
  getContentProgress: async () => storyProgress,
  submitContentProgress: async () => {},
};
