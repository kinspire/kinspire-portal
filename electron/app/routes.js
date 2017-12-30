/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import Background from './components/Background';
import Home from './components/Home';

export default () => (
  <App>
    <Background title="Title">
      <Switch>
        <Route path="/" component={Home} />
      </Switch>
    </Background>
  </App>
);
