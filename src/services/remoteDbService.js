// @flow
import firebase from 'firebase';

import * as db from '../db';

export const remoteDbService = {
  upload,
  download,
};

// Initialize Firebase
let config = require('../keys/firebase-keys.json');
firebase.initializeApp(config);

let firebaseDbs = ['users', 'content', 'contentProgress', 'contentSubmissions'];

function uploadPromise(dbLink, db) {
  return new Promise((resolve, reject) => {
    db.find({}, function(err, docs) {
      if (err !== null) return reject(err);

      // Convert docs into firebase format
      firebase.database().ref(`${dbLink}/`).set(docs.reduce((acc, cur) => {
        acc[cur._id] = cur; return acc;
      }, {}), (err) => {
        if (err !== null) return reject(err);

        resolve();
      });
    });
  });
}

function upload() {
  return Promise.all(firebaseDbs.map(x => uploadPromise(x, db[`${x}Db`])));
}

function downloadPromise(dbLink, db) {
  return new Promise((resolve, reject) => {
    firebase.database().ref(`${dbLink}/`).once('value').then(function(snapshot) {
      db.remove({}, {multi: true}, function(err) {
        if (err !== null) return reject(err);

        function done() {
          // TODO update localStorage for the currently logged-in user
          resolve();
        }

        if (snapshot.val()) {
          let docs = Object.values(snapshot.val());
          db.insert(docs, function(err) {
            if (err !== null) return reject(err);

            done();
          });
        } else {
          done();
        }
      });
    });
  });
}

function download() {
  return Promise.all(firebaseDbs.map(x => downloadPromise(x, db[`${x}Db`])));
}
