// @flow
import firebase from 'firebase';

// Initialize Firebase
const config = require('../keys/firebase-keys.json');
firebase.initializeApp(config);

const db = firebase.firestore();
db.settings({
  timestampsInSnapshots: true,
});

export const firebaseService = {
  db,
};
