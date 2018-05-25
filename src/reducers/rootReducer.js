import { combineReducers } from 'redux';

import { authentication } from './authenticationReducer';
import { remoteDb } from './remoteDbReducer';

const rootReducer = combineReducers({
  authentication,
  remoteDb
});

export default rootReducer;
