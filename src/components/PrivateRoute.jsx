import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

// The logic behind this is as follows.
// - Rendering this PrivateRoute at the end of the day is the same as rendering
// a Route. What's special about this is that it renders differently based on
// whether there's a user logged in.
// - If the user is logged in, we return a normal route with the component. If
// not, then we return a `Redirect` to the login screen.
// - The props passed to `PrivateRoute` are:
//   + `component`: the component to be rendered if the user is logged in
//   + `componentProps`: any other props to be passed in to the component
//   + `...rest`: any other props to be passed to the Route encapsulating the
//   component
const PrivateRoute = function(props) {
  // This is ES6 syntax which says, take props.component and save it in a const
  // `Component`.
  const { component: Component, componentProps, ...rest } = props;

  return (<Route {...rest}
    render={
      (routeProps) => (
        localStorage.getItem("user") ?
          <Component {...routeProps} {...componentProps} /> :
          <Redirect to={{ pathname: "/login", state: { from: routeProps.location } }}/>
      )
    }/>);
};

PrivateRoute.propTypes = {
  component: PropTypes.element.isRequired,
  componentProps: PropTypes.object,
};

export default PrivateRoute;
