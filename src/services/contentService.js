// @flow
import Datastore from 'nedb';

import { contentDb, contentProgressDb } from '../db';

export const contentService = {
  getNextContentItems
};

// TODO: worry about whether user is logged in?
// TODO what is type....?
function getNextContentItems(type) {
  // return new Promise(function(resolve, reject) {
  //   resolve([{type: "story", text: "Story", classLevel: 1, num: 0}]);
  // });

  return new Promise(function(resolve, reject) {
    let user = JSON.parse(localStorage.getItem('user'));

    // Get current student's content progress blob
    contentProgressDb.find({ user_id: user._id }, function(err, docs) {
      if (err) return reject(err);

      let nextStory;
      if (!docs.length) {
        console.error("NO CONTENT PROGRESS");
      } else {
        let contentProgressBlob = docs[0];

        contentDb.find({ type: type, classLevel: user.classLevel, number: contentProgressBlob[type] }, function(err, docs) {
          if (err) return reject(err);

          if (!docs.length) {
            // TODO: no actual content, what do we do?
          } else {
            resolve([docs[0]]);
          }
        });
      }
    });
  });
}
