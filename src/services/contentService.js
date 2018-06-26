// @flow
import { contentDb, contentProgressDb } from '../db';

export const contentService = {
  getNextContentItems,
  getContent
};

// TODO: worry about whether user is logged in?
function getNextContentItems() {
  // return new Promise(function(resolve, reject) {
  //   resolve([{type: "story", text: "Story", classLevel: 1, num: 0}]);
  // });

  return new Promise(function(resolve, reject) {
    let user = JSON.parse(localStorage.getItem('user'));

    // Get current student's content progress blob
    contentProgressDb.find({ userId: user._id }, function(err, docs) {
      if (err) return reject(err);

      if (!docs.length) {
        console.error("NO CONTENT PROGRESS");
      } else {
        let contentProgressBlob = docs[0];

        // TODO only fetch certain fields instead of the whole thing?
        contentDb.find({ classLevel: user.classLevel, num: contentProgressBlob.storyNum, type: "story" }, function(err, docs) {
          if (err) return reject(err);

          if (!docs.length) {
            // TODO: no actual content, what do we do?
          } else {
            // TODO: copy the whole story/word search logic here
            resolve([docs[0]]);
          }
        });
      }
    });
  });
}

function getContent(type, classLevel, num) {
  return new Promise(function(resolve, reject) {
    contentDb.find({ type, classLevel: parseInt(classLevel, 10), num: parseInt(num, 10) }, function(err, docs) {
      if (err !== null) reject(err);

      if (!docs.length) {
        // TODO no actual content, what do we do
      } else {
        resolve(docs[0]);
      }
    });
  });
}
