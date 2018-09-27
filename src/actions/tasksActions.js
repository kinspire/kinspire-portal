// @flow
import { tasksService } from '../services/tasksService';
import { tasksConstants } from '../constants';

export const tasksActions = {
  markAsDone
};

function markAsDone(taskId) {
  return dispatch => {
    dispatch(request());

    return tasksService.markAsDone(taskId)
    .then(
      () => {
        // #2
        dispatch(success());
      },
      error => {
        // #2
        dispatch(failure(error));
      }
    );
  };

  function request() { return { type: tasksConstants.MARK_DONE_REQUEST } }
  function success(nextContentItems) { return { type: tasksConstants.MARK_DONE_SUCCESS, nextContentItems } }
  function failure(error) { return { type: tasksConstants.MARK_DONE_FAILURE, error } }
}
