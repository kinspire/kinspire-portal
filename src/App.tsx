import React from "react";
import { Route, Switch } from "react-router-dom";

import "./App.css";
import Container from "./Container";
import Activities from "./pages/Activities";
import Home from "./pages/Home";
import Materials from "./pages/Materials";
import Test from "./pages/Test";

const App: React.FC = () => {
  // TODO adjust title pl0x
  return (
    <Container title="Portal">
      <Switch>
        <Route path="/materials" render={Materials} />
        <Route path="/activities" render={Activities} />
        <Route path="/test" render={Test} />
        <Route path="/" component={Home} />
      </Switch>
    </Container>
  );
};

export default App;
