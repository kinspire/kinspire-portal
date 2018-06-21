import { combineReducers } from 'redux';

import { content } from './contentReducer';
import { authentication } from './authenticationReducer';
import { remoteDb } from './remoteDbReducer';

const rootReducer = combineReducers({
  authentication,
  content,
  remoteDb
});

export default rootReducer;
