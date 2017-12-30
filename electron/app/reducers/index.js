// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import counter from './counter';
import users from './users';

const rootReducer = combineReducers({
  counter,
  router,
  users
});

export default rootReducer;
