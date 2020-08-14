import React from "react";
import { Route, Switch } from "react-router-dom";

import { ThemeProvider } from "@material-ui/core";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Activities from "./pages/Activities";
import Course from "./pages/Course";
import Courses from "./pages/Courses";
import Home from "./pages/Home";
import Lesson from "./pages/Lesson";
import Login from "./pages/Login";
import Module from "./pages/Module";
import Register from "./pages/Register";
import Test from "./pages/Test";
import WordSearch from "./pages/WordSearch";
import WordSearches from "./pages/WordSearches";
import { portalTheme } from "./Theme";

const App: React.FC = () => {
  // TODO adjust title pl0x
  // TODO move scaffold here
  return (
    <ThemeProvider theme={portalTheme}>
      <div className="portal-content">
        <main>
          <Header />
          <Switch>
            <Route path="/lesson/:course/:tier/:module/:lesson" component={Lesson} />
            <Route path="/home" component={Home} />
            <Route path="/activities" component={Activities} />
            <Route path="/module/:course/:tier/:module" component={Module} />
            <Route path="/course/:id" component={Course} />
            <Route path="/courses" component={Courses} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/test" component={Test} />
            {/* <Route path="/materials" component={Materials} /> */}
            <Route path="/wordsearch/:classLevel/:num" component={WordSearch} />
            <Route path="/wordsearches" component={WordSearches} />
            {/* <Route path="/story/:classLevel/:num" component={Story} /> */}
            {/* <Route path="/stories" component={Stories} /> */}
            <Route path="/" component={Home} />
          </Switch>
          <Footer />
        </main>
      </div>
    </ThemeProvider>
  );
};

export default App;
