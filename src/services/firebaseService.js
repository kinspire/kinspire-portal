// @flow
import firebase from 'firebase/app';
import 'firebase/firestore';

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
