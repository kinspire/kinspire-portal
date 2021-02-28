import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import { View, ActivityIndicator, Text, StyleSheet, Button } from "react-native";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-native";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { loadInitial, TOKEN_KEY } from "./services/storage";
import { useSelector } from "./store";
import { setToken } from "./store/actions";

export default function App() {
  const loading = useSelector((state) => state.loading);
  const token = useSelector((state) => state.token);

  const dispatch = useDispatch();

  // Load state from storage
  useEffect(() => {
    loadInitial();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem(TOKEN_KEY);
    dispatch(setToken(undefined));
  };

  return (
    <>
      <View style={styles.container}>
        {token ? (
          <>
            <Button onPress={handleLogout} title="Logout" />
            <Text>Logged in!</Text>
            <Switch>
              <Route path="/" component={Home} />
            </Switch>
          </>
        ) : (
          <Switch>
            <Route path="/" component={Login} />
          </Switch>
        )}
      </View>
      {loading && <ActivityIndicator />}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
