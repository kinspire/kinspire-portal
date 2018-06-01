// @flow
import Datastore from 'nedb';
import firebase from 'firebase';

export const remoteDbService = {
  upload,
  download,
};

let usersDb = new Datastore({filename: 'users.db', autoload: true});

// Initialize Firebase
var config = require('../keys/firebase-keys.json');
firebase.initializeApp(config);

// Sync
function upload() {
  return new Promise(function(resolve, reject) {
    usersDb.find({}, function(err, users) {
      firebase.database().ref('users/').set(users.reduce((acc, cur) => {
        acc[cur._id] = cur; return acc;
      }, {}), (err) => {
        if (err !== null) return reject(err);

        resolve();
      });
    });
  });
}

function download() {
  return new Promise(function(resolve, reject) {
    firebase.database().ref('users/').once('value').then(function(snapshot) {
      usersDb.remove({}, {multi: true}, function(err, numRemoved) {
        if (err !== null) return reject(err);

        usersDb.insert(snapshot.val(), function(err, newUsers) {
          if (err !== null) return reject(err);

          // TODO update localStorage for the currently logged-in user

          resolve();
        });
      });
    });
  });
}
