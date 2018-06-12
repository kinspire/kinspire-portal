import { activityConstants } from '../constants/';

let initialState = {
  nextActivities: []
};

export function activity(state = initialState, action) {
  switch (action.type) {
    case activityConstants.NEXT_ACTIVITIES_REQUEST:
      return state;
    case activityConstants.NEXT_ACTIVITIES_SUCCESS:
      return {
        nextActivities: action.nextActivities
      };
    case activityConstants.NEXT_ACTIVITIES_FAILURE:
      return {
        error: "Next Activities Failure"
      };
    default:
      return state;
  }
}
