import { TypedUseSelectorHook, useSelector as useReduxSelector } from "react-redux";
import { createStore, Reducer } from "redux";
import { KPortalState, Types } from "./types";

const initialState: KPortalState = {};

export const mainReducer: Reducer<KPortalState> = (state = initialState, action) => {
  switch (action.type) {
    case Types.SET_LOADING: {
      return {
        ...state,
        loading: action.payload,
      };
    }
    case Types.SET_TOKEN: {
      return {
        ...state,
        token: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export const store = createStore(mainReducer);

export const useSelector: TypedUseSelectorHook<KPortalState> = useReduxSelector;
