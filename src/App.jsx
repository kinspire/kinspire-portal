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
import { viewConstants as v } from "./constants";
// import StoryCollection from "./pages/StoryCollection";

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
          <Route path="/task/:taskId" component={Task} />
          {/* <Route path="/materials/story/:classLevel/:num" component={Story} /> */}
          <Route path="/materials" render={(props) => <Selection {...props} key={v.MATERIALS} view={v.MATERIALS} />} />
          <Route path="/activities/wsplay/:classLevel/:num" component={WordSearch} />
          <Route path="/activities/wordsearch" render={(props) => <Selection {...props} key={v.WORDSEARCH} view={v.WORDSEARCH} />} />
          <Route path="/activities/stories" render={(props) => <Selection {...props} key={v.STORIES} view={v.STORIES} />}/>
          <Route path="/activities" render={(props) => <Selection {...props} key={v.ACTIVITIES} view={v.ACTIVITIES} />} />
          <Route path="/" component={Home} />
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
