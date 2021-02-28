import { Reducer } from "redux";
import { ContentState, ContentTypes } from "./types";

const initialState: ContentState = {
  courses: [],
};

export const contentReducer: Reducer<ContentState> = (state = initialState, action) => {
  switch (action.type) {
    case ContentTypes.SET_COURSES: {
      return { ...state, courses: action.payload };
    }
    default: {
      return state;
    }
  }
};
