// @flow
import { remoteDbService } from '../services/remoteDbService';
import { remoteDbConstants } from '../constants';

export const remoteDbActions = {
  sync
}

function sync() {
  return dispatch => {
    dispatch(request());

    return remoteDbService.sync()
    .then(
      () => {
        dispatch(success());
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  // Synchronous action creators
  function request() { return { type: remoteDbConstants.SYNC_REQUEST } }
  function success() { return { type: remoteDbConstants.SYNC_SUCCESS } }
  function failure(error) { return { type: remoteDbConstants.SYNC_FAILURE, error } }
}
