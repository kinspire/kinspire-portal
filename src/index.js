import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from './helpers/store';
import Container from './Container';
import PrivateRoute from './components/PrivateRoute';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import registerServiceWorker from './registerServiceWorker';

import Achievements from './pages/Achievements';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Selection from './pages/Selection';
import Story from './pages/Story';

let materials = {
  items: [
    {name: "Stories", link: "materials/stories"},
    {name: "Templates", link: "materials/templates"}
  ]
};

let stories = {
  items: [
    {name: "Story 1", link: "story/1"}
  ]
};

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Container title="Kinspire Portal">
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <PrivateRoute path="/achievements" component={Achievements} />
          <PrivateRoute path="/materials/story/:storyNumber" component={Story} />
          <PrivateRoute path="/materials/stories" component={Selection} componentProps={stories} />
          <PrivateRoute path="/materials" component={Selection} componentProps={materials} />
          <PrivateRoute path="/" component={Home} />
        </Switch>
      </Container>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
