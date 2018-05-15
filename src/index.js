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

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Container title="Kinspire Portal">
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <PrivateRoute path="/" component={Home} />
          <PrivateRoute path="/achievements" component={Achievements} />
        </Switch>
      </Container>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
