// @flow
import Datastore from 'nedb';
import firebase from 'firebase';

import { usersDb, contentDb, contentProgressDb } from '../db';

export const remoteDbService = {
  upload,
  download,
};

// Initialize Firebase
var config = require('../keys/firebase-keys.json');
firebase.initializeApp(config);

function uploadPromiseGen(dbLink, db) {
  return new Promise(function(resolve, reject) {
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

// Sync
function upload() {
  return Promise.all([
    uploadPromiseGen('users', usersDb),
    uploadPromiseGen('content', contentDb),
    uploadPromiseGen('contentProgress', contentProgressDb)
  ])
}

function downloadPromiseGen(dbLink, db) {
  return new Promise(function(resolve, reject) {
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
  return Promise.all([
    downloadPromiseGen('users', usersDb),
    downloadPromiseGen('content', contentDb),
    downloadPromiseGen('contentProgress', contentProgressDb)
  ]);
}

// TODO add function to fetch content from remote db
