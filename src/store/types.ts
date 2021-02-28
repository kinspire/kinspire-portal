export enum Types {
  SET_LOADING = "SET_LOADING",
  SET_TOKEN = "SET_TOKEN",
}

export interface KPortalState {
  loading?: boolean;
  token?: string;
}
