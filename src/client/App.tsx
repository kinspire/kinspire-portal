import React from "react";
import { Route, Switch } from "react-router-dom";

import "./App.css";
import Header from "./components/Header";
// import Activities from "./pages/Activities";
import Home from "./pages/Home";
import Materials from "./pages/Materials";
import Stories from "./pages/Stories";
import Story from "./pages/Story";
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
          <Route path="/test" component={Test} />
          <Route path="/materials" component={Materials} />
          <Route path="/wordsearch/:classLevel/:num" component={WordSearch} />
          <Route path="/wordsearches" component={WordSearches} />
          <Route path="/story/:classLevel/:num" component={Story} />
          <Route path="/stories" component={Stories} />
          <Route path="/" component={Home} />
        </Switch>
      </main>
    </div>
  );
};

export default App;