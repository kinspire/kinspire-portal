import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './App';
import PrivateRoute from './components/PrivateRoute';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import Home from './pages/Home';
import Login from './pages/Login';

// TODO need to use store and history somehow

ReactDOM.render(
  <BrowserRouter>
    <App title="Kinspire Portal">
      <Switch>
        <PrivateRoute exact path="/" component={Home} />
        <Route path="/login" component={Login} />
      </Switch>
    </App>
  </BrowserRouter>,
  document.getElementById('root')
);

registerServiceWorker();
