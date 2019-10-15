import React from "react";
import { Route, Switch } from "react-router-dom";

import "./App.css";
import Selection from "./components/Selection";
import { ViewConstants as V } from "./constants";
import Container from "./Container";
import Home from "./pages/Home";

const App: React.FC = () => {
  // TODO adjust title pl0x
  return (
    <Container title="Portal">
      <Switch>
        <Route path="/materials" render={props => <Selection {...props} view={V.MATERIALS} />} />
        <Route path="/activities" render={props => <Selection {...props} view={V.ACTIVITIES} />} />
        <Route path="/" component={Home} />
      </Switch>
    </Container>
  );
};

export default App;
