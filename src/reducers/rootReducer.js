import { combineReducers } from 'redux';

import { activity } from './activityReducer';
import { authentication } from './authenticationReducer';
import { remoteDb } from './remoteDbReducer';

const rootReducer = combineReducers({
  authentication,
  activity,
  remoteDb
});

export default rootReducer;
