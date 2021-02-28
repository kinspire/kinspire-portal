import { action } from "typesafe-actions";
import { UserTypes } from "./types";

export const setToken = (token: string | undefined) => action(UserTypes.SET_TOKEN, token);
