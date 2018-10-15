// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Menu from './components/Menu';
import Back from './components/Back';

import './Container.css';
import top from './images/portal-top-bar.png';
import left from './images/portal-left-bar.png';
import bottom from './images/portal-bottom-bar.png';
import right from './images/portal-right-bar.png';

class Container extends Component {
  // TODO set content height on resize

  render() {
    // TODO: menu and back button only if logged in
    // TODO: title component with the explode() logic from PHP
    // TODO: removed sync button
    return (
      <div id="portal-content">
        <img alt="top" id="portal-background-top" src={top}/>
        <img alt="bottom" id="portal-background-bottom" src={bottom}/>
        <img alt="left" id="portal-background-left" src={left}/>
        <img alt="right" id="portal-background-right" src={right}/>
        <div id="portal-header">
          <Menu/>
          <div className="portal-title">{ this.props.title }</div>
          <Back/>
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
