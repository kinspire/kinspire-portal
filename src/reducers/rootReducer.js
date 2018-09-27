import { combineReducers } from 'redux';

import { content } from './contentReducer';
import { authentication } from './authenticationReducer';
import { remoteDb } from './remoteDbReducer';
import { tasks } from './tasksReducer';

const rootReducer = combineReducers({
  authentication,
  content,
  remoteDb,
  tasks,
});

export default rootReducer;
