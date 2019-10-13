import React from "react";
import { Route, Switch } from "react-router-dom";

import "./App.css";
import Container from "./Container";
import Home from "./pages/Home";

const App: React.FC = () => {
  // TODO adjust title pl0x
  return (
    <Container title="Portal">
      <Switch>
        <Route path="/" component={Home} />
      </Switch>
    </Container>
  );
};

export default App;
