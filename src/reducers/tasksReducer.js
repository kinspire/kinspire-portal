import { tasksConstants } from '../constants/';

export function tasks(state = {}, action) {
  switch (action.type) {
    case tasksConstants.MARK_DONE_REQUEST:
      return {
        markingDone: true
      };
    case tasksConstants.MARK_DONE_SUCCESS:
      return {
        markedDone: true
      };
    case tasksConstants.MARK_DONE_FAILURE:
      return {
        error: "Sync failure"
      };
    default:
      return state;
  }
}
