import { action } from "typesafe-actions";
import { Types } from "./types";

export const setLoading = (loading: boolean) => action(Types.SET_LOADING, loading);
export const setToken = (token: string) => action(Types.SET_TOKEN, token);
