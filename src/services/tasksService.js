// @flow
import { firebaseService } from './firebaseService';

const STATUS_NOT_STARTED = 0;
// const STATUS_DONE = 1;

export const tasksService = {
  // markAsDone,
  getTasks,
};

function getTasks() {
  return new Promise(resolve => {
    firebaseService.db.collection("users").doc(localStorage.getItem('userId'))
      .collection("tasks").where("status", "==", STATUS_NOT_STARTED)
      .onSnapshot(snapshot => {
        // TODO sanitize and convert to simple js objects
        resolve(snapshot.docs);
      });
  });
}
