// @flow
import { remoteDbService } from '../services/remoteDbService';
import { remoteDbConstants } from '../constants';

export const remoteDbActions = {
  upload,
  download
}

function upload() {
  return dispatch => {
    dispatch(request());

    return remoteDbService.upload()
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
  function request() { return { type: remoteDbConstants.UPLOAD_REQUEST } }
  function success() { return { type: remoteDbConstants.UPLOAD_SUCCESS } }
  function failure(error) { return { type: remoteDbConstants.UPLOAD_FAILURE, error } }
}

function download() {
  return dispatch => {
    dispatch(request());

    return remoteDbService.download()
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
  function request() { return { type: remoteDbConstants.DOWNLOAD_REQUEST } }
  function success() { return { type: remoteDbConstants.DOWNLOAD_SUCCESS } }
  function failure(error) { return { type: remoteDbConstants.DOWNLOAD_FAILURE, error } }
}
