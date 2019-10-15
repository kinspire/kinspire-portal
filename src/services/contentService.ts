import { ViewConstants as v } from "../constants";

const materials = [
  { name: "Resume/CV Templates", link: "/materials/templates" },
  { name: "Writing Tips", link: "/materials/tips" },
  { name: "Career Paths", link: "/materials/careerpaths" },
  { name: "Health & Wellness", link: "/materials/health" },
];
const activities = [
  { name: "Word Searches", link: "/activities/wordsearch" },
  { name: "Stories", link: "/activities/stories" },
];
const stories = [{ name: "Story 1", link: "/activities/story/1" }];
const wordSearches = [{ name: "Word Search 1", link: "/activities/wsplay/1" }];

// Returns a promsie that resolves with a list of items for the given selection
// screen view.
// TODO This has room to be de-redundancy'd
export const getSelectionItems = async (view: v) => {
  switch (view) {
  case v.MATERIALS:
    return materials;
  case v.ACTIVITIES:
    return activities;
  case v.STORIES:
    /*
    return db
      .collection("content")
      .where("type", "==", "story")
      .where("classLevel", "==", parseInt(_.get(user, "classLevel", 1), 10))
      .get()
      .then(snapshot => {
        return snapshot.docs.map(doc => ({
          name: doc.get("title"),
          link: `/activities/story/${doc.get("classLevel")}/${doc.get("num")}`,
        }));
      });
      */
    return stories;
  case v.WORDSEARCH:
    /*
    return db
      .collection("content")
      .where("type", "==", "wordsearch")
      .where("classLevel", "==", parseInt(_.get(user, "classLevel", 1), 10))
      .get()
      .then(snapshot => {
        return snapshot.docs.map(doc => ({
          name: doc.get("title"),
          link: `/activities/wsplay/${doc.get("classLevel")}/${doc.get("num")}`,
        }));
      });
      */
    return wordSearches;
  }
  throw new Error("Illegal view");
};
