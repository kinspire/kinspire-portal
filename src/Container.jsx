import React, { Component } from "react";
import PropTypes from "prop-types";

import Menu from "./components/Menu";
import Back from "./components/Back";

import "./Container.css";
// import top from "./images/portal-top-bar.png";
// import left from "./images/portal-left-bar.png";
// import bottom from "./images/portal-bottom-bar.png";
// import right from "./images/portal-right-bar.png";

// The main container for the Portal.
class Container extends Component {
  render() {
    return (
      <div id="portal-content">
        {/* <img alt="top" id="portal-background-top" src={top}/>
        <img alt="bottom" id="portal-background-bottom" src={bottom}/>
        <img alt="left" id="portal-background-left" src={left}/>
        <img alt="right" id="portal-background-right" src={right}/> */}
        <div id="portal-header">
          {/* Both the menu and the back buttons should only be visible if logged in */}
          {localStorage.getItem("user") ? <Menu/> : ""}
          {/* <div className="portal-title">{ this.props.title }</div> */}
          {localStorage.getItem("user") ? <Back/> : ""}
        </div>
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
