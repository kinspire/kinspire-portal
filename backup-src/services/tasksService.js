import firebaseService from "./firebaseService";

// Status of the task
const STATUS_NOT_STARTED = 0;
// const STATUS_DONE = 1;

export default {
  getTasks,
  getTask,
};

const db = firebaseService.db;

// Returns a promise that resolves with a list of tasks
function getTasks() {
  return db.collection("users").doc(localStorage.getItem("userId"))
    .collection("tasks").where("status", "==", STATUS_NOT_STARTED)
    .get().then(snapshot => snapshot.docs.map(doc => (
      Object.assign({ id: doc.id }, doc.data())
    )));
}

function getTask(id) {
  return db.collection("users").doc(localStorage.getItem("userId"))
    .collection("tasks").doc(id)
    .get().then(doc => {
      if (!doc.exists) {
        throw new Error("Invalid task id");
      }

      return doc.data();
    });
}
