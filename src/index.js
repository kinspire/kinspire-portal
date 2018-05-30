import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import registerServiceWorker from './registerServiceWorker';

import { store } from './helpers/store';
import Container from './Container';
import PrivateRoute from './components/PrivateRoute';
import { viewConstants as v } from './constants';

// TODO order matters? Yuck
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Achievements from './pages/Achievements';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Selection from './pages/Selection';
import Story from './pages/Story';
import WordSearch from './pages/WordSearch';

// TODO do something about making the portal-body automatic in all pages

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Container title="Portal">
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <PrivateRoute path="/achievements" component={Achievements} />
          <PrivateRoute path="/materials/story/:classLevel/:storyNumber" component={Story} />
          <PrivateRoute path="/materials/stories" component={Selection} componentProps={{view: v.STORIES}} />
          <PrivateRoute path="/materials" component={Selection} componentProps={{view: v.MATERIALS}} />
          <PrivateRoute path="/activities/wsplay/:classLevel/:storyNumber" component={WordSearch} />
          <PrivateRoute path="/activities/wordsearch" component={Selection} componentProps={{view: v.WORDSEARCH}} />
          <PrivateRoute path="/activities" component={Selection} componentProps={{view: v.ACTIVITIES}} />
          <PrivateRoute path="/" component={Home} />
        </Switch>
      </Container>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
