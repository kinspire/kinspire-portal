import { Reducer } from "redux";
import { UserState, UserTypes } from "./types";

const initialState: UserState = {};

export const userReducer: Reducer<UserState> = (state = initialState, action) => {
  switch (action.type) {
    case UserTypes.SET_TOKEN: {
      return { ...state, token: action.payload };
    }
    default: {
      return state;
    }
  }
};
