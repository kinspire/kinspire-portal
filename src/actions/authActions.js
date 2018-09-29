// @flow
import { authService } from '../services/authService';
import { authConstants } from '../constants';

export const authActions = {
  login,
  logout,
  signup
}

// Thunk action creator
function login(username) {
  return dispatch => {
    // Dispatch #1: Dispatch the synchronous request action to update application state
    dispatch(request({ username }));

    return authService.login(username)
    .then(
      user => {
        // Dispatch #2: Dispatch the synchronous login action, once login is complete
        dispatch(success(user));
      },
      error => {
        // Dispatch #2: Dispatch the synchronous failed login action
        dispatch(failure(error));
      }
    );
  };

  // These are the synchronous action creators
  function request(user) { return { type: authConstants.LOGIN_REQUEST, user } }
  function success(user) { return { type: authConstants.LOGIN_SUCCESS, user } }
  function failure(error) { return { type: authConstants.LOGIN_FAILURE, error } }
}

// TODO fix up
function logout() {
  authService.logout();
  return { type: authConstants.LOGOUT };
}

// Thunk action creator
function signup(details) {
  return dispatch => {
    // Dispatch #1: Dispatch the synchronous request action to update application state
    dispatch(request(details));

    return authService.signup(details)
    .then(
      user => {
        // Dispatch #2: Dispatch the synchronous login action, once login is complete
        dispatch(success(user));
      },
      error => {
        // Dispatch #2: Dispatch the synchronous failed login action
        dispatch(failure(error));
      }
    );
  };

  // These are the synchronous action creators
  function request(user) { return { type: authConstants.SIGNUP_REQUEST, user } }
  function success(user) { return { type: authConstants.SIGNUP_SUCCESS, user } }
  function failure(error) { return { type: authConstants.SIGNUP_FAILURE, error } }
}
