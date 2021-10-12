// TODO this is the current solution. I feel like this might be better
// as variables in CSS, but there's a chance that these will be used in
// the JS, so to avoid duplication I'm putting it here. Definitely worth
// a second look.

export enum FontType {
  PAGETITLE = "page-title",
  HEADING1 = "heading-1",
  HEADING2 = "heading-2",
}

export enum PageView {
  HOME = "HOME",
  COURSES = "COURSES", //aka Curricula
  ACTIVITIES = "ACTIVITIES",
  COURSE = "COURSE",
  WORD_SEARCH = "WORDSEARCH",
  SECTION = "SECTION",
  PROFILE = "PROFILE",
  ABOUT = "ABOUT",
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
}

export const getColor = (v: PageView | string): string => {
  switch (v) {
    case PageView.COURSES:
      return "#a9bb59";
    case PageView.COURSE:
      return "#D4DDAC";
    case PageView.SECTION:
      return "white";
    case PageView.ACTIVITIES:
      return "#79b4b3";
    case PageView.WORD_SEARCH:
      return "white";
    case PageView.ABOUT:
      return "#fc5e5a";
    case PageView.PROFILE:
      return "#a586c5";
    case PageView.LOGIN:
      return "#262626";
    case PageView.LOGOUT:
      return "#908E8D";
    case PageView.HOME:
      return "#f5bf53";
    case "BUTTON":
      return "#f5bf53";
    case "HELP":
      return "#fa8e47";
  }
  return "#262626";
};
