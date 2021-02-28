export enum UserTypes {
  SET_TOKEN = "@@user/SET_TOKEN",
}

export interface UserState {
  token?: string;
}
