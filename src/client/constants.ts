// TODO this is the current solution. I feel like this might be better
// as variables in CSS, but there's a chance that these will be used in
// the JS, so to avoid duplication I'm putting it here. Definitely worth
// a second look.

import { ContentType } from "@common/schema";
import { FormControl } from "@material-ui/core";

export enum FontType {
  PAGETITLE = "page-title",
  HEADING1 = "heading-1",
  HEADING2 = "heading-2",
}

export enum View {
  HOME = "HOME",
  MATERIALS = "MATERIALS", //aka Curricula
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
    case View.MATERIALS:
      return "#a9bb59";
    case View.STORIES:
      return "#D4DDAC";
    case View.STORY:
      return "white";
    case View.ACTIVITIES:
      return "#79b4b3";
    case View.WORD_SEARCH:
      return "white";
    case View.ABOUT:
      return "#fc5e5a";
    case View.PROFILE:
      return "#a586c5";
    case View.LOGIN:
      return "lightgray";
    case View.HOME:
      return "#f5bf53";
    case "BUTTON":
      return "#f5bf53";
    case "HELP":
      return "#fa8e47";
  }
  return "lightgray";
};

// The text used per type
export const contentStrings = {
  [ContentType.STORY]: "Story",
  [ContentType.WORD_SEARCH]: "Word Search",
  [ContentType.TASK]: "Task",
};
