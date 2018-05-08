import { userService } from '../services/userService';
import { userConstants } from '../constants/userConstants';
import { history } from '../helpers/history';

export const userActions = {
  login,
  logout
}

// Thunk action creator
function login(username, password) {
  return dispatch => {
    // Dispatch #1: Dispatch the synchronous request action to update application state
    dispatch(request({ username }));

    return userService.login(username, password)
    .then(
      user => {
        // Dispatch #2: Dispatch the synchronous login action, once login is complete
        dispatch(success(user));
        history.push('/');
      },
      error => {
        dispatch(failure(error));
        // dispatch(alertActions.error(error));
      }
    );
  };

  // These are the synchronous action creators
  function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
  function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
  function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

// TODO fix up
function logout() {
  userService.logout();
  return { type: userConstants.LOGOUT };
}
