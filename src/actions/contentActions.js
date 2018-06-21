// @flow
import { contentService } from '../services/contentService';
import { contentConstants } from '../constants';

export const contentActions = {
  getNextContentItems
}

// Thunk action creator
function getNextContentItems() {
  return dispatch => {
    // #1
    dispatch(request());

    return contentService.getNextContentItems()
    .then(
      nextContentItems => {
        // #2
        dispatch(success(nextContentItems));
      },
      error => {
        // #2
        dispatch(failure(error));
      }
    );
  };

  function request() { return { type: contentConstants.NEXT_CONTENT_ITEMS_REQUEST } }
  function success(nextContentItems) { return { type: contentConstants.NEXT_CONTENT_ITEMS_SUCCESS, nextContentItems } }
  function failure(error) { return { type: contentConstants.NEXT_CONTENT_ITEMS_FAILURE, error } }
}
