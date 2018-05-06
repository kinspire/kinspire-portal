export const USER_LOGIN   = 'USER_LOGIN';
export const USER_LOGOUT  = 'USER_LOGOUT';

export function login(user, password) {
  return {
    type: USER_LOGIN,
    payload: {
      user: user, password: password
    }
  };
};
