import React, { useEffect } from "react";
import { View, ActivityIndicator, StyleSheet, StatusBar } from "react-native";
import { Switch, Route } from "react-router-native";
import Header from "./components/Header";
import Courses from "./pages/Courses";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { loadInitial } from "./services/storage";
import { useSelector } from "./store";

export default function App() {
  const loading = useSelector((state) => state.uiState.loading);
  const token = useSelector((state) => state.userState.token);

  // Load state from storage
  useEffect(() => {
    loadInitial();
  }, []);

  return (
    <>
      <StatusBar backgroundColor="#123456" barStyle="dark-content" />
      <View>
        <Header />
        {token ? (
          <Switch>
            <Route path="/courses" component={Courses} />
            <Route path="/" component={Home} />
          </Switch>
        ) : (
          <Switch>
            <Route path="/" component={Login} />
          </Switch>
        )}
        {loading && <ActivityIndicator size="large" color="#654321" />}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
