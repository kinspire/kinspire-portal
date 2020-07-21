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
    case View.MATERIALS:
    case View.STORIES:
    case View.STORY:
      return "#a9bb59";
    case View.ACTIVITIES:
    case View.WORD_SEARCH:
      return "#79b4b3";
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

export const getSize = (v: View | string): string => {
  switch (v) {
    case FontType.PAGETITLE:
      return "75px";
    case FontType.HEADING1:
      return "60px";
    case FontType.HEADING2:
      return "45px";
  }
  return "24";
};

export const getWeight = (v: View | string): string => {
  switch (v) {
    case FontType.PAGETITLE:
      return "bolder";
    case FontType.HEADING1:
      return "bold";
    case FontType.HEADING2:
      return "normal";
  }
  return "normal";
};

// The text used per type
export const contentStrings = {
  [ContentType.STORY]: "Story",
  [ContentType.WORD_SEARCH]: "Word Search",
  [ContentType.TASK]: "Task",
};
