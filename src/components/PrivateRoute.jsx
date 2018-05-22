// @flow
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

let PrivateRoute = ({ component: Component, componentProps, ...rest }) => (
  <Route {...rest}
    render={
      (props) => {
        return (
          localStorage.getItem('user') ?
            <Component {...props} {...componentProps} /> :
            <Redirect to={{ pathname: '/login', state: { from: props.location } }}/>
        );
      }
    }/>
);

export default PrivateRoute;
