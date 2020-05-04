import React from "react";
import { Route, Switch } from "react-router-dom";

import "./App.css";
import Header from "./components/Header";
import Story from "./components/Story";
import Activities from "./pages/Activities";
import Course from "./pages/Course";
import Courses from "./pages/Courses";
// import Activities from "./pages/Activities";
import Home from "./pages/Home";
import Lesson from "./pages/Lesson";
import Login from "./pages/Login";
import Module from "./pages/Module";
import Register from "./pages/Register";
// import Materials from "./pages/Materials";
import Test from "./pages/Test";
import WordSearch from "./pages/WordSearch";
import WordSearches from "./pages/WordSearches";

const App: React.FC = () => {
  // TODO adjust title pl0x
  // TODO move scaffold here
  return (
    <div className="portal-content">
      <main>
        <Header />
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/activities" component={Activities} />
          {/* Path for lesson */}
          <Route path="/lesson/:course/:tier/:module/:lesson" component={Lesson} />
          <Route path="/module/:course/:tier/:module" component={Module} />
          <Route path="/course/:id" component={Course} />
          <Route path="/courses" component={Courses} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/test" component={Test} />
          {/* <Route path="/materials" component={Materials} /> */}
          <Route path="/wordsearch/:classLevel/:num" component={WordSearch} />
          <Route path="/wordsearches" component={WordSearches} />
          <Route path="/story/:classLevel/:num" component={Story} />
          <Route path="/" component={Home} />
        </Switch>
      </main>
    </div>
  );
};

export default App;
