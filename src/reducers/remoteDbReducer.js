import { remoteDbConstants } from '../constants/';

// TODO ?
const initialState = {};

export function remoteDb(state = initialState, action) {
  switch (action.type) {
    case remoteDbConstants.UPLOAD_REQUEST:
    case remoteDbConstants.DOWNLOAD_REQUEST:
      return {
        synchronizing: true
      };
    case remoteDbConstants.UPLOAD_SUCCESS:
    case remoteDbConstants.DOWNLOAD_SUCCESS:
      return {
        synchronized: true
      };
    case remoteDbConstants.UPLOAD_FAILURE:
    case remoteDbConstants.DOWNLOAD_FAILURE:
      return {
        error: "Sync failure"
      };
    default:
      return state;
  }
}
