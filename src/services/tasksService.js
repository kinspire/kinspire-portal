// @flow
import _ from 'lodash';

import { tasksDb } from '../db';

const STATUS_NOT_STARTED = 0;
const STATUS_IN_PROGRESS = 1;
const STATUS_DONE = 2;

export const tasksService = {
  markAsDone,
};

function markAsDone(taskId) {
  return new Promise((resolve, reject) => {
    tasksDb.find({ _id: taskId }, function(err, docs) {
      if (err) return reject(err);

      if (!docs.length) {
        // Task not found
        console.error("Doc not found");
        reject();
      } else {
        let task = docs[0];
        task.status = STATUS_DONE;
        resolve();
      }
    });
  });
}
