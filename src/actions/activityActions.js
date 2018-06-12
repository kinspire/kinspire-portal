// @flow
import { activityService } from '../services/activityService';
import { activityConstants } from '../constants';

export const activityActions = {
  getNextActivities
}

// Thunk action creator
function getNextActivities() {
  return dispatch => {
    // #1
    dispatch(request());

    return activityService.getNextActivities()
    .then(
      nextActivities => {
        // #2
        dispatch(success(nextActivities));
      },
      error => {
        // #2
        dispatch(failure(error));
      }
    );
  };

  function request() { return { type: activityConstants.NEXT_ACTIVITIES_REQUEST } }
  function success(nextActivities) { return { type: activityConstants.NEXT_ACTIVITIES_SUCCESS, nextActivities } }
  function failure(error) { return { type: activityConstants.NEXT_ACTIVITIES_FAILURE, error } }
}
