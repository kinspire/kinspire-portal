// @flow
import Datastore from 'nedb';
import firebase from 'firebase';

export const remoteDbService = {
  sync
};

let usersDb = new Datastore({filename: 'users.db', autoload: true});

// Initialize Firebase
var config = require('../keys/firebase-keys.json');
firebase.initializeApp(config);

// Sync
function sync() {
  return new Promise(function(resolve, reject) {
    usersDb.find({}, function(err, users) {
      firebase.database().ref('users/').set(users, (err) => {
        if (err !== null) return reject(err);

        resolve();
      });
    });
  });
}
