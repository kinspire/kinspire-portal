// TODO this is the current solution. I feel like this might be better
// as variables in CSS, but there's a chance that these will be used in
// the JS, so to avoid duplication I'm putting it here. Definitely worth
// a second look.

import { ContentType } from "@common/schema";

export enum View {
  HOME = "HOME",
  MATERIALS = "MATERIALS",
  ACTIVITIES = "ACTIVITIES",
  STORIES = "STORIES",
  WORD_SEARCH = "WORDSEARCH",
  STORY = "STORY",
  PROFILE = "PROFILE",
  ABOUT = "ABOUT",
  LOGIN = "LOGIN",
}

export const getColor = (v: View | string): string => {
  switch (v) {
    case View.STORIES:
    case View.STORY:
      return "#79b4b3";
    case View.MATERIALS:
    case View.ACTIVITIES:
    case View.WORD_SEARCH:
      return "#a9bb59";
    case View.ABOUT:
      return "#fc5e5a";
    case View.PROFILE:
      return "#a586c5";
    case "BUTTON":
      return "#f5bf53";
    case "HELP":
      return "#fa8e47";
    case "MENU":
      return "#201d1a";
    case View.LOGIN:
      return "#262626";
  }
  return "lightgray";
};

// The text used per type
export const contentStrings = {
  [ContentType.STORY]: "Story",
  [ContentType.WORD_SEARCH]: "Word Search",
  [ContentType.TASK]: "Task",
};
