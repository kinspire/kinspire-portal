import { set } from "lodash";
import { Reducer } from "redux";
import { ContentState, ContentTypes } from "./types";

const initialState: ContentState = {
  courses: [],
  sections: {},
};

export const contentReducer: Reducer<ContentState> = (state = initialState, action) => {
  switch (action.type) {
    case ContentTypes.SET_COURSES: {
      return { ...state, courses: action.payload };
    }
    case ContentTypes.SET_SECTIONS: {
      return {
        ...state,
        sections: set(state.sections, action.payload.courseId, action.payload.sections),
      };
    }
    default: {
      return state;
    }
  }
};
