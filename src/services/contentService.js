import { firebaseService } from "./firebaseService";
import { viewConstants as v } from "../constants";

export const contentService = {
  // getNextContentItems,
  getContent,
  getContentProgress,
  submitContent,
  getSelectionItems,
};

const db = firebaseService.db;
const materials = [
  {name: "Stories", link: "/materials/stories"},
  {name: "Templates", link: "/materials/templates"}
];
const activities = [
  {name: "Word Search", link: "/activities/wordsearch"}
];

// TODO: worry about whether user is logged in?
// TODO move online
// function getNextContentItems() {
//   return new Promise((resolve, reject) => {
//     const user = JSON.parse(localStorage.getItem('user'));
//     if (!user) reject(new Error("User not logged in"));
//
//     // Get current student's content progress blob
//     contentProgressDb.find({ userId: user._id }, (err, docs) => {
//       if (err) return reject(err);
//
//       if (!docs.length) {
//         console.error("NO CONTENT PROGRESS");
//       } else {
//         const progress = docs[0];
//
//         // TODO only fetch certain fields instead of the whole thing for each content blob?
//
//         // 1. Always fetch the next story
//         const storiesQuery = {
//           classLevel: user.classLevel,
//           num: progress.storyNum,
//           type: c.TYPE_STORY
//         };
//
//         // 2. Fetch word searches from wordsearchNum until but not including storyNum
//         const wordsearchQuery = {
//           classLevel: user.classLevel,
//           $and: [
//             { num: { $gte: progress.wordsearchNum } },
//             { num: { $lt: progress.storyNum } }
//           ],
//           type: c.TYPE_WORD_SEARCH
//         };
//
//         Promise.all([queryPromise(storiesQuery), queryPromise(wordsearchQuery)])
//           .then((value) => {
//           // combine arrays into a single one
//             resolve(_.flatten(value));
//           });
//       }
//     });
//   });
// }

// Retrieve content from the Firebase db
function getContent(type, classLevel, num) {
  return db.collection("content")
    .where("type", "==", type)
    .where("classLevel", "==", parseInt(classLevel, 10))
    .where("num", "==", parseInt(num, 10))
    .limit(1)
    .get()
    .then(snapshot => {
      if (snapshot.empty) {
        throw new Error("No content available!");
      }

      return snapshot.docs[0].data();
    });
}

function getContentProgress(type, classLevel, num) {
  return db.collection("contentProgress")
    .where("type", "==", type)
    .where("classLevel", "==", parseInt(classLevel, 10))
    .where("num", "==", parseInt(num, 10))
    .where("userId", "==", localStorage.getItem("userId"))
    .limit(1)
    .get()
    .then(snapshot => {
      if (snapshot.empty) {
        return {};
      }

      console.log(snapshot.docs[0].data());
      console.log(localStorage.getItem("userId"));
      return snapshot.docs[0].data();
    });
}

// progress is an object
function submitContent(type, classLevel, num, progress) {
  return db.collection("contentProgress")
    .where("type", "==", type)
    .where("classLevel", "==", parseInt(classLevel, 10))
    .where("num", "==", parseInt(num, 10))
    .where("userId", "==", localStorage.getItem("userId"))
    .limit(1)
    .get()
    .then(snapshot => {
      if (snapshot.empty) {
        return db.collection("contentProgress")
          .add({
            ...progress,
            type, classLevel: parseInt(classLevel, 10), num: parseInt(num, 10), userId: localStorage.getItem("userId"),
          });
      } else {
        return snapshot.docs[0].ref.set(progress, { merge: true });
      }
    });
}

// Get items for the selection screen based on the view
function getSelectionItems(view) {
  return new Promise(resolve => {
    switch (view) {
    case v.MATERIALS:
      resolve(materials);
      break;
    case v.ACTIVITIES:
      resolve(activities);
      break;
    // TODO combine this and wordsearch
    case v.STORIES:
      db.collection("content")
        .where("type", "==", "story")
        .get()
        .then(snapshot => {
          resolve(snapshot.docs.map(doc => (
            {
              name: doc.get("title"),
              // TODO make a utility function to convert doc to link
              link: `/materials/story/${doc.get("classLevel")}/${doc.get("num")}`
            }
          )));
        });
      break;
    case v.WORDSEARCH:
      db.collection("content")
        .where("type", "==", "wordsearch")
        .get()
        .then(snapshot => {
          resolve(snapshot.docs.map(doc => (
            {
              name: doc.get("title"),
              // TODO make a utility function to convert doc to link
              link: `/activities/wsplay/${doc.get("classLevel")}/${doc.get("num")}`
            }
          )));
        });
      break;
    default:
      break;
    }
  });
}
