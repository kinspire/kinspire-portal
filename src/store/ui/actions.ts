import { action } from "typesafe-actions";
import { UiTypes } from "./types";

export const setLoading = (loading: boolean) => action(UiTypes.SET_LOADING, loading);
