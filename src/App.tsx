import React from "react";
import { Route, Switch } from "react-router-dom";

import "./App.css";
import Activities from "./pages/Activities";
import Home from "./pages/Home";
import Materials from "./pages/Materials";
import Stories from "./pages/Stories";
import Story from "./pages/Story";
import Test from "./pages/Test";

const App: React.FC = () => {
  // TODO adjust title pl0x
  return (
    <Switch>
      <Route path="/test" component={Test} />
      <Route path="/materials" component={Materials} />
      <Route path="/activities/story/:classLevel/:num" component={Story} />
      <Route path="/activities/stories" component={Stories} />
      <Route path="/" component={Activities} />
    </Switch>
  );
};

export default App;
