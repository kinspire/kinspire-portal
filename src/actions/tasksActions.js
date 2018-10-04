// @flow
import { tasksService } from '../services/tasksService';
import { tasksConstants } from '../constants';

export const tasksActions = {
  markAsDone,
  getTasks,
};

function markAsDone(taskId) {
  return dispatch => {
    dispatch(request());

    return tasksService.markAsDone(taskId)
      .then(
        () => { dispatch(success()); },
        error => { dispatch(failure(error)); }
      );
  };

  function request() { return { type: tasksConstants.MARK_DONE_REQUEST }; }
  function success(nextContentItems) { return { type: tasksConstants.MARK_DONE_SUCCESS, nextContentItems }; }
  function failure(error) { return { type: tasksConstants.MARK_DONE_FAILURE, error }; }
}

function getTasks() {
  return dispatch => {
    dispatch(request());

    return tasksService.getTasks()
      .then(
        () => { dispatch(success()); },
        error => { dispatch(failure(error)); }
      );
  };

  function request() { return { type: tasksConstants.MARK_DONE_REQUEST }; }
  function success(nextContentItems) { return { type: tasksConstants.MARK_DONE_SUCCESS, nextContentItems }; }
  function failure(error) { return { type: tasksConstants.MARK_DONE_FAILURE, error }; }
}
