import firebase from "firebase/app";
import "firebase/firestore";
import _ from "lodash";
import log from "loglevel";

import { ContentType } from "../constants";
import { Content, ContentProgress, ContentService } from "./schema";

// Initialize Firebase
import config from "../keys/firebase-keys.json";

firebase.initializeApp(config);

// Access the firestore through this reference.
const db = firebase.firestore();

const CONTENT = "content";
const CONTENT_PROGRESS = "contentProgress";

const USER_ID = "user";

export class FirebaseContentService implements ContentService {
  public getStories = async () => {
    const snapshot = await db
      .collection(CONTENT)
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
      .collection(CONTENT)
      .where("type", "==", c)
      .where("classLevel", "==", classLevel)
      .where("num", "==", num)
      .get();

    if (snapshot.size === 0) {
      throw new Error("Invalid class/num");
    }
    log.info("Got story with id", snapshot.docs[0].id);

    return snapshot.docs[0].data() as Content;
  };

  public getContentProgress = async (c: ContentType, classLevel: number, num: number) => {
    const snapshot = await db
      .collection(CONTENT_PROGRESS)
      .where("type", "==", c)
      .where("classLevel", "==", classLevel)
      .where("num", "==", num)
      .get();

    if (snapshot.size > 0) {
      return snapshot.docs[0].data() as ContentProgress;
    }
    return null;
  };

  public submitContentProgress = async (cp: ContentProgress) => {
    const snapshot = await db
      .collection(CONTENT_PROGRESS)
      .where("type", "==", cp.type)
      .where("classLevel", "==", cp.classLevel)
      .where("num", "==", cp.num)
      .where("userId", "==", cp.userId || USER_ID)
      .get();

    if (snapshot.size > 0) {
      await db
        .collection(CONTENT_PROGRESS)
        .doc(snapshot.docs[0].id)
        .update({
          answers: cp.answers,
        });
    } else {
      await db.collection(CONTENT_PROGRESS).add(_.assign({ userId: USER_ID }, cp));
    }
  };
}

/*
    return db
      .collection(CONTENT)
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
      .collection(CONTENT)
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
