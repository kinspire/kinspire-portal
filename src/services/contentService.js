import firebaseService from "./firebaseService";
import { viewConstants as v } from "../constants";
import swal from "sweetalert";

export default {
  // getNextContentItems,
  getContent,
  getContentProgress,
  submitContentProgress,
  deleteContent,
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

// This is outdated functionality, where a student can automatically advance to
// the next content item once one is completed.
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

// Returns a promise that resolves with the content with the specified
// parameters, or throws an error.
function getContent(type, classLevel, num) {
  return db.collection("content")
    .where("type", "==", type)
    .where("classLevel", "==", parseInt(classLevel, 10))
    .where("num", "==", parseInt(num, 10)) //only files that fit these 3 contraints are only retrieved
    .limit(1)
    .get() //actually gets data
    .then(snapshot => { //after data is retrieved, THEN do ...
      if (snapshot.empty) {
        throw new Error("No content available!");
      }
      return snapshot.docs[0].data(); //docs is a field inside spanshot object
    });
}

// Returns a promise that resolves with the content progress with the specified
// parameters, or returns an empty object if there is no progress.
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
      return snapshot.docs[0].data();
    });
}

// Returns a promise that resolves when the given content progress is submitted
// to the database.
function submitContentProgress(type, classLevel, num, progress) {
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
            type,
            classLevel: parseInt(classLevel, 10),
            num: parseInt(num, 10),
            userId: localStorage.getItem("userId"),
          });
      } else {
        return snapshot.docs[0].ref.set(progress, { merge: true });
      }
    });
}

function deleteContent(type, classLevel, num){
  db.collection("contentProgress")
    .where("type", "==", type)
    .where("classLevel", "==", parseInt(classLevel, 10))
    .where("num", "==", parseInt(num,10))
    .where("userId", "==", localStorage.getItem("userId"))
    .limit(1)
    .get()
    .then(snapshot => {
      if(snapshot.empty){
        swal("Already Deleted");
      } else {
        snapshot.docs[0].ref.delete().catch((error) => {
          swal(`Error${  error}`);
        });
      }
    });
}

// Returns a promsie that resolves with a list of items for the given selection
// screen view.
// TODO This has room to be de-redundancy'd
function getSelectionItems(view) {
  switch (view) {
  case v.MATERIALS:
    return Promise.resolve(materials);
  case v.ACTIVITIES:
    return Promise.resolve(activities);
  case v.STORIES:
    return db.collection("content")
      .where("type", "==", "story")
      .get()
      .then(snapshot => {
        return snapshot.docs.map(doc => (
          {
            name: doc.get("title"),
            link: `/materials/story/${doc.get("classLevel")}/${doc.get("num")}`
          }
        ));
      });
  case v.WORDSEARCH:
    return db.collection("content")
      .where("type", "==", "wordsearch")
      .get()
      .then(snapshot => {
        return snapshot.docs.map(doc => (
          {
            name: doc.get("title"),
            link: `/activities/wsplay/${doc.get("classLevel")}/${doc.get("num")}`
          }
        ));
      });
  }
  return Promise.reject("Illegal view");
}
