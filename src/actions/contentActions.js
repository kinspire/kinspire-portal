// @flow
import { contentService } from '../services/contentService';
import { contentConstants } from '../constants';

export const contentActions = {
  getNextContentItems,
  getContent
}

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

function getContent(type, classLevel, num) {
  return dispatch => {
    // #1
    dispatch(request());

    return contentService.getContent(type, classLevel, num)
    .then(
      content => {
        // #2
        dispatch(success(content));
      },
      error => {
        // #2
        dispatch(failure(error));
      }
    );
  };

  function request() { return { type: contentConstants.GET_CONTENT_REQUEST } }
  function success(content) { return { type: contentConstants.GET_CONTENT_SUCCESS, content } }
  function failure(error) { return { type: contentConstants.GET_CONTENT_FAILURE, error } }
}
