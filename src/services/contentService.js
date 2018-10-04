// @flow
import _ from 'lodash';

import { contentDb, contentProgressDb, contentSubmissionsDb } from '../db';
import { contentConstants as c } from '../constants';
import { firebaseService } from './firebaseService';

export const contentService = {
  getNextContentItems,
  getContent,
  submitContent
};

function queryPromise(query) {
  return new Promise((resolve, reject) => {
    contentDb.find(query, (err, docs) => {
      if (err) return reject(err);

      resolve(docs);
    });
  });
}

// TODO: worry about whether user is logged in?
// TODO move online
function getNextContentItems() {
  return new Promise((resolve, reject) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) reject(new Error("User not logged in"));

    // Get current student's content progress blob
    contentProgressDb.find({ userId: user._id }, (err, docs) => {
      if (err) return reject(err);

      if (!docs.length) {
        console.error("NO CONTENT PROGRESS");
      } else {
        const progress = docs[0];

        // TODO only fetch certain fields instead of the whole thing for each content blob?

        // 1. Always fetch the next story
        const storiesQuery = {
          classLevel: user.classLevel,
          num: progress.storyNum,
          type: c.TYPE_STORY
        };

        // 2. Fetch word searches from wordsearchNum until but not including storyNum
        const wordsearchQuery = {
          classLevel: user.classLevel,
          $and: [
            { num: { $gte: progress.wordsearchNum } },
            { num: { $lt: progress.storyNum } }
          ],
          type: c.TYPE_WORD_SEARCH
        };

        Promise.all([queryPromise(storiesQuery), queryPromise(wordsearchQuery)])
          .then((value) => {
          // combine arrays into a single one
            resolve(_.flatten(value));
          });
      }
    });
  });
}

function getContent(type, classLevel, num) {
  return new Promise(resolve => {
    firebaseService.db.collection("content")
      .where("type", "==", type)
      .where("classLevel", "==", parseInt(classLevel, 10))
      .where("num", "==", parseInt(num, 10))
      .limit(1)
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          resolve(doc.data());
        });
      });
  });
}

// TODO move online
function submitContent(type, classLevel, num, answers) {
  return new Promise((resolve, reject) => {
    contentSubmissionsDb.insert({type, classLevel, num, answers}, (err, doc) => {
      if (err !== null) reject(err);

      if (!doc) {
        // TODO what to do?
      } else {
        // TODO anything to resolve with? Maybe if they're done or not?
        resolve();
      }
    });
  });
}
