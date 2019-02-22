import React, { Component } from "react";
import PropTypes from "prop-types";

import Header from "./components/Header";
import Back from "./components/Back";

import "./Container.css";

// The main container for the Portal.
class Container extends Component {
  render() {
    return (
      <div id="portal-content">
          <Header/>
        {this.props.children}
      </div>
    );
  }
}

Container.propTypes = {
  children: PropTypes.element,
  title: PropTypes.string,
};

export default Container;
