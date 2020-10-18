import { find } from "lodash";
import { courses } from "../../common/Sample";
import { ContentService } from "../../common/schema";

export const LocalContentService: Partial<ContentService> = {
  getCourses: async () => courses,
  getCourse: async (id: string) => find(courses, (c) => c.id === id),
};
