import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from './helpers/store';
import Container from './Container';
import PrivateRoute from './components/PrivateRoute';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import Home from './pages/Home';
import Login from './pages/Login';

// TODO need to use store and history somehow

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Container title="Kinspire Portal">
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </Container>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
