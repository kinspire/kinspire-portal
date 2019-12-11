import firebase from "firebase/app";
import "firebase/firestore";

import { ContentType } from "../constants";
import { Content, ContentProgress, ContentService } from "./schema";

// Initialize Firebase
import config from "../keys/firebase-keys.json";

firebase.initializeApp(config);

// Access the firestore through this reference.
const db = firebase.firestore();

export class FirebaseContentService implements ContentService {
  public getStories = async () => {
    const snapshot = await db
      .collection("content")
      .where("type", "==", "story")
      // .where("classLevel", "==", parseInt(_.get(user, "classLevel", 1), 10))
      .get();

    return snapshot.docs.map(doc => ({
      name: doc.get("title"),
      link: `/activities/story/${doc.get("classLevel")}/${doc.get("num")}`,
    }));
  };

  public getContent = async (c: ContentType, classLevel: number, num: number) => {
    const snapshot = await db
      .collection("content")
      .where("type", "==", c)
      .where("classLevel", "==", classLevel)
      .where("num", "==", num)
      .get();

    return snapshot.docs[0].data() as Content;
  };

  public getContentProgress = async (c: ContentType, classLevel: number, num: number) => {
    const snapshot = await db
      .collection("contentProgress")
      .where("type", "==", c)
      .where("classLevel", "==", classLevel)
      .where("num", "==", num)
      .get();

    return snapshot.docs[0].data() as ContentProgress;
  };

  public submitContentProgress = async () => {};
}

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
