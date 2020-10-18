import React from "react";
import { Route, Switch } from "react-router-dom";

import { Dialog, DialogTitle, Snackbar, ThemeProvider } from "@material-ui/core";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Activities from "./pages/Activities";
import Course from "./pages/Course";
import Courses from "./pages/Courses";
import Home from "./pages/Home";
import Module from "./pages/Module";
import Login from "./pages/Login";
import Submit from "./pages/Submit";
import Register from "./pages/Register";
import Section from "./pages/Section";
import Test from "./pages/Test";
import { useSelector } from "./store";
import { portalTheme } from "./Theme";

const App: React.FC = () => {
  const loading = useSelector((state) => state.loading);
  const token = useSelector((state) => state.token);

  // TODO adjust title pl0x
  // TODO move scaffold here
  return (
    <ThemeProvider theme={portalTheme}>
      <div className="portal-content">
        <main>
          <Header />
          {token ? (
            <Switch>
              <Route path="/submit/:course/:section/:module" component={Submit} />
              <Route path="/activities" component={Activities} />
              <Route path="/module/:course/:section/:module" component={Module} />
              <Route path="/section/:course/:section" component={Section} />
              <Route path="/course/:course" component={Course} />
              <Route path="/courses" component={Courses} />
              <Route path="/test" component={Test} />
              {/* <Route path="/materials" component={Materials} /> */}
              {/* <Route path="/story/:classLevel/:num" component={Story} /> */}
              {/* <Route path="/stories" component={Stories} /> */}
              <Route path="/" component={Home} />
            </Switch>
          ) : (
            <Switch>
              <Route path="/register" component={Register} />
              <Route path="/" component={Login} />
            </Switch>
          )}
          <Footer />
        </main>
      </div>
      <Dialog open={loading}>
        <DialogTitle>Loading...</DialogTitle>
      </Dialog>
    </ThemeProvider>
  );
};

export default App;
