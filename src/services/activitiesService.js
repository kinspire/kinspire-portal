// @flow
import Datastore from 'nedb';

export const activitiesService = {
  getNextActivity
};

let activitiesDb = new Datastore({filename: 'activities.db', autoload: true});
let contentDb = new Datastore({filename: 'content.db', autoload: true});

// TODO: worry about whether user is logged in?

function getNextActivity(type) {
  return new Promise(function(resolve, reject) {
    let user = JSON.parse(localStorage.getItem('user'));

    // Get current student's activity blob
    activitiesDb.find({ _id: user._id }, function(err, docs) {
      if (err) return reject(err);

      let nextStory;
      if (!docs.length) {
        // no information, so default to 0
      } else {
        let activityBlob = docs[0];

        contentDb.find({ type: type, classLevel: user.classLevel, number: activityBlob[type] }, function(err, docs) {
          if (err) return reject(err);

          if (!docs.length) {
            // TODO: no info, what do we do?
          } else {
            resolve(docs[0]);
          }
        });
      }
    });
  })
}
