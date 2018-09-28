// @flow
import { tasksDb } from '../db';

const STATUS_NOT_STARTED = 0;
const STATUS_DONE = 1;

export const tasksService = {
  markAsDone,
};

function markAsDone(taskId) {
  return new Promise((resolve, reject) => {
    tasksDb.find({ _id: taskId }, (err, docs) => {
      if (err) return reject(err);

      if (!docs.length) {
        // Task not found
        console.error("Doc not found");
        reject();
      } else {
        const task = docs[0];
        task.status = STATUS_DONE;
        resolve();
      }
    });
  });
}
