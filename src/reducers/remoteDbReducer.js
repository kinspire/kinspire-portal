import { remoteDbConstants } from '../constants/';

// TODO ?
const initialState = {};

export function remoteDb(state = initialState, action) {
  switch (action.type) {
    case remoteDbConstants.SYNC_REQUEST:
      return {
        synchronizing: true
      };
    case remoteDbConstants.SYNC_SUCCESS:
      return {
        synchronized: true
      };
    case remoteDbConstants.SYNC_FAILURE:
      return {
        error: "Sync failure"
      };
    default:
      return state;
  }
}
