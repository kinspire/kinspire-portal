// @flow
import Datastore from 'nedb';
import firebase from 'firebase';

export const remoteDbService = {
  upload,
  download,
};

// TODO exactly one service should control a single datastore
let usersDb = new Datastore({filename: 'users.db', autoload: true});

// Initialize Firebase
var config = require('../keys/firebase-keys.json');
firebase.initializeApp(config);

// Sync
function upload() {
  return new Promise(function(resolve, reject) {
    usersDb.find({}, function(err, users) {
      // Convert users into firebase format
      firebase.database().ref('users/').set(users.reduce((acc, cur) => {
        acc[cur._id] = cur; return acc;
      }, {}), (err) => {
        if (err !== null) return reject(err);

        resolve();
      });
    });
  });
}

// TODO doesn't work?
function download() {
  return new Promise(function(resolve, reject) {
    firebase.database().ref('users/').once('value').then(function(snapshot) {
      usersDb.remove({}, {multi: true}, function(err, numRemoved) {
        if (err !== null) return reject(err);

        function done() {
          // TODO update localStorage for the currently logged-in user
          resolve();
        }

        if (snapshot.val()) {
          usersDb.insert(snapshot.val(), function(err, newUsers) {
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

// TODO add function to fetch content from remote db
