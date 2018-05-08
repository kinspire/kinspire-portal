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

// TODO need to use store and history somehow

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Container title="Kinspire Portal">
        <Switch>
          <Route path="/login" component={Login} />
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute path="/achievements" component={Achievements} />
        </Switch>
      </Container>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
