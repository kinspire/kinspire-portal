import { TypedUseSelectorHook, useSelector as useReduxSelector } from "react-redux";
import { combineReducers, createStore, Reducer, Store } from "redux";
import { contentReducer } from "./content";
import { ContentState } from "./content/types";
import { uiReducer } from "./ui";
import { UiState } from "./ui/types";
import { userReducer } from "./user";
import { UserState } from "./user/types";

export interface KPortalState {
  userState: UserState;
  uiState: UiState;
  contentState: ContentState;
}

const createRootReducer = () =>
  combineReducers<KPortalState>({
    userState: userReducer,
    uiState: uiReducer,
    contentState: contentReducer,
  });

function configureStore(initialState?: KPortalState): Store<KPortalState> {
  return createStore(createRootReducer(), initialState);
}

export const store = configureStore();

export const useSelector: TypedUseSelectorHook<KPortalState> = useReduxSelector;
