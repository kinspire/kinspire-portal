import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import PropTypes from "prop-types";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Selection from "./pages/Selection";
import Story from "./pages/Story";
import WordSearch from "./pages/WordSearch";
import Task from "./pages/Task";
import Container from "./Container";
import PrivateRoute from "./components/PrivateRoute";
import { viewConstants as v } from "./constants";

class App extends Component {
  render() {
    let content;

    if (!localStorage.getItem("user")) {
      content = (
        <Switch>
          <Route path="/signup" component={Signup} />
          <Route path="/" component={Login} />
        </Switch>
      );
    } else {
      content = (
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <PrivateRoute path="/task/:taskId" component={Task} />
          <PrivateRoute path="/materials/story/:classLevel/:num" component={Story} />
          <PrivateRoute path="/materials/stories" component={Selection} componentProps={{view: v.STORIES}} />
          <PrivateRoute path="/materials" component={Selection} componentProps={{view: v.MATERIALS}} />
          <PrivateRoute path="/activities/wsplay/:classLevel/:num" component={WordSearch} />
          <PrivateRoute path="/activities/wordsearch" component={Selection} componentProps={{view: v.WORDSEARCH}} />
          <PrivateRoute path="/activities" component={Selection} componentProps={{view: v.ACTIVITIES}} />
          <PrivateRoute path="/" component={Home} />
        </Switch>
      );
    }

    // Show different things based on login status
    return (
      <Container title="Portal">
        {content}
      </Container>
    );
  }
}

// The main container for the Portal.
App.propTypes = {
  children: PropTypes.element,
  title: PropTypes.string,
};

export default App;
