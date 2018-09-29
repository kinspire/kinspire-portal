import { authConstants } from '../constants/';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case authConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case authConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    case authConstants.SIGNUP_REQUEST:
      return {
        signingUp: true,
        user: action.user
      };
    case authConstants.SIGNUP_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    case authConstants.LOGOUT:
      return {
        loggedIn: false
      };
    case authConstants.LOGIN_FAILURE:
    case authConstants.SIGNUP_FAILURE:
      return {
        error: action.error
      };
    default:
      return state;
  }
}
