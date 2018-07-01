import { contentConstants } from '../constants/';

let initialState = {
  nextContentItems: []
};

export function content(state = initialState, action) {
  switch (action.type) {
    case contentConstants.NEXT_CONTENT_ITEMS_SUCCESS:
      return {
        nextContentItems: action.nextContentItems
      };
    case contentConstants.GET_CONTENT_SUCCESS:
      return {
        content: action.content
      };
    case contentConstants.SUBMIT_CONTENT_REQUEST:
      return {
        submittingContent: true
      };
    case contentConstants.SUBMIT_CONTENT_SUCCESS:
      return {
        submittedContent: true
      };
    case contentConstants.NEXT_CONTENT_ITEMS_FAILURE:
      return {
        error: "Next Content Items Failure"
      };
    case contentConstants.GET_CONTENT_FAILURE:
      return {
        error: "Get Content Failure"
      };
    case contentConstants.SUBMIT_CONTENT_FAILURE:
      return {
        error: "Submit Content Failure"
      };
    default:
      return state;
  }
}
