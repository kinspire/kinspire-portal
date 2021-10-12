import React, { useEffect } from "react";
import { View, ActivityIndicator, StyleSheet, StatusBar, Text } from "react-native";
import { Switch, Route, useLocation } from "react-router-native";
import { getColor, PageView } from "../constants";
import Header from "./components/Header";
import Course from "./pages/Course";
import Courses from "./pages/Courses";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Module from "./pages/Module";
import Section from "./pages/Section";
import { loadInitial } from "./services/storage";
import { useSelector } from "./store";

const pageColor = (path: string) => {
  if (path.startsWith("/courses")) {
    return getColor(PageView.COURSES);
  }
  if (path.startsWith("/course")) {
    return getColor(PageView.COURSE);
  }
  if (path.startsWith("/section")) {
    return getColor(PageView.SECTION);
  }
  if (path === "/") {
    return getColor(PageView.HOME);
  }
};

export default function App() {
  const loading = useSelector((state) => state.uiState.loading);
  const token = useSelector((state) => state.userState.token);

  // Load state from storage
  useEffect(() => {
    loadInitial();
  }, []);

  const loc = useLocation();

  return (
    <>
      <StatusBar backgroundColor="#123456" barStyle="dark-content" />
      <View style={{ ...styles.container, backgroundColor: pageColor(loc.pathname) }}>
        {token ? (
          <>
            <Header />
            <View style={styles.content}>
              <Text>Logged in as: {token}</Text>
              <Switch>
                <Route path="/module/:courseId/:sectionId/:moduleId" component={Module} />
                <Route path="/section/:courseId/:sectionId" component={Section} />
                <Route path="/course/:courseId" component={Course} />
                <Route path="/courses" component={Courses} />
                <Route path="/" component={Home} />
              </Switch>
            </View>
          </>
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
    backgroundColor: "#122437",
    flex: 1,
  },
  content: {
    padding: 16,
  },
});
