import AsyncStorage from "@react-native-async-storage/async-storage";
import { store } from "../store";
import { setToken } from "../store/user/actions";

export const TOKEN_KEY = "userToken";

export const loadInitial = async () => {
  const token = await AsyncStorage.getItem(TOKEN_KEY);
  if (token !== null) {
    store.dispatch(setToken(token));
  }
};
