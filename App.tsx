import React from "react";
import { NativeRouter, Route, Switch } from "react-router-native";
import Footer from "./components/Footer";
import Header from "./components/Header";
// import Home from "./pages/HomeLel";
import Login from "./pages/Login";
import { store, useSelector } from "./store";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { Provider } from "react-redux";

const App: React.FC = () => {
  const loading = useSelector((state) => state.loading);
  const token = useSelector((state) => state.token);

  // TODO adjust title pl0x
  // TODO move scaffold here
  return (
    <Provider store={store}>
      <NativeRouter>
        <View style={styles.portalContent}>
          <Header />
          {token ? (
            <Switch>
              {/* <Route path="/submit/:course/:section/:module" component={Submit} />
            <Route path="/activities" component={Activities} />
            <Route path="/module/:course/:section/:module" component={Module} />
            <Route path="/section/:course/:section" component={Section} />
            <Route path="/course/:course" component={Course} />
            <Route path="/courses" component={Courses} />
            <Route path="/test" component={Test} /> */}
              {/* <Route path="/materials" component={Materials} /> */}
              {/* <Route path="/story/:classLevel/:num" component={Story} /> */}
              {/* <Route path="/stories" component={Stories} /> */}
              {/* <Route path="/" component={Home} /> */}
            </Switch>
          ) : (
            <Switch>
              {/* <Route path="/register" component={Register} /> */}
              <Route path="/" component={Login} />
            </Switch>
          )}
          <Footer />
        </View>
        {loading && <ActivityIndicator />}
      </NativeRouter>
    </Provider>
  );
};

const styles = StyleSheet.create({
  portalContent: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
});

export default App;
