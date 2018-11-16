import { firebaseService } from './firebaseService';

// Status of the task
const STATUS_NOT_STARTED = 0;
const STATUS_DONE = 1;

export const tasksService = {
  getTasks,
};

// Returns a promise that resolves with a list of tasks
function getTasks() {
  return new Promise(resolve => {
    firebaseService.db.collection("users").doc(localStorage.getItem('userId'))
      .collection("tasks").where("status", "==", STATUS_NOT_STARTED)
      .onSnapshot(snapshot => {
        // TODO sanitize and convert to simple js objects
        resolve(snapshot.docs.map(doc => {
          return Object.assign({
            id: doc.id
          }, doc.data());
        }));
      });
  });
}
