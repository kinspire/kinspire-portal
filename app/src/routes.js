/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import App from './components/App';
import Home from './components/Home';

export default () => (
  <App title="Kinspire Portal">
    <Switch>
      <Route path="/" component={Home} />
    </Switch>
  </App>
);
