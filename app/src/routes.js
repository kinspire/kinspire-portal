/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import App from './components/App';
import Background from './components/Background';
import Home from './components/Home';

export default () => (
  <App>
    <Background title="Kinspire Portal">
      <Switch>
        <Route path="/" component={Home} />
      </Switch>
    </Background>
  </App>
);
