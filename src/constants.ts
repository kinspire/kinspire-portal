// TODO this is the current solution. I feel like this might be better
// as variables in CSS, but there's a chance that these will be used in
// the JS, so to avoid duplication I'm putting it here. Definitely worth
// a second look.

export enum ViewConstants {
  MATERIALS = "MATERIALS",
  ACTIVITIES = "ACTIVITIES",
  STORIES = "STORIES",
  WORDSEARCH = "WORDSEARCH",
  PROFILE = "PROFILE",
  ABOUT = "ABOUT",
}

export const Colors: Record<ViewConstants | string, string> = {
  [ViewConstants.ACTIVITIES]: "#79b4b3",
  [ViewConstants.MATERIALS]: "#a9bb59",
  [ViewConstants.ABOUT]: "#fc5e5a",
  [ViewConstants.PROFILE]: "#a586c5",
  BUTTON: "#f5bf53",
  HELP: "#fa8e47",
  MENU: "#201d1a",
};

// The different types of content
export enum ContentConstants {
  TYPE_STORY = "story",
  TYPE_WORD_SEARCH = "wordsearch",
  TYPE_TASK = "task",
}

// The text used per type
export const contentStrings = {
  [ContentConstants.TYPE_STORY]: "Story",
  [ContentConstants.TYPE_WORD_SEARCH]: "Word Search",
  [ContentConstants.TYPE_TASK]: "Task",
};
