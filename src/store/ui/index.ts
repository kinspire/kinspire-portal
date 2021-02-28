import { Reducer } from "redux";
import { UiState, UiTypes } from "./types";

const initialState: UiState = {
  loading: false,
};

export const uiReducer: Reducer<UiState> = (state = initialState, action) => {
  switch (action.type) {
    case UiTypes.SET_LOADING: {
      return { ...state, loading: action.payload };
    }
    default: {
      return state;
    }
  }
};
