import { contentConstants } from '../constants/';

let initialState = {
  nextContentItems: []
};

export function content(state = initialState, action) {
  switch (action.type) {
    case contentConstants.NEXT_CONTENT_ITEMS_REQUEST:
      return state;
    case contentConstants.NEXT_CONTENT_ITEMS_SUCCESS:
      return {
        nextContentItems: action.nextContentItems
      };
    case contentConstants.NEXT_CONTENT_ITEMS_FAILURE:
      return {
        error: "Next Content Items Failure"
      };
    default:
      return state;
  }
}
