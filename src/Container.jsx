// @flow
import React, { Component } from 'react';

import Menu from './components/Menu';
import Back from './components/Back';
import SyncButton from './components/SyncButton';

import './Container.css';
import top from './images/portal-top-bar.png';
import left from './images/portal-left-bar.png';
import bottom from './images/portal-bottom-bar.png';
import right from './images/portal-right-bar.png';

class Container extends Component {
  props: {
    children: Children
  };

  // TODO set content height on resize

  render() {
    // TODO: menu and back button only if logged in
    // TODO: title component with the explode() logic from PHP
    return (
      <div id="portal-content" style={{minHeight: window.innerHeight, maxHeight: window.innerHeight}}>
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
        <SyncButton/>
      </div>
    );
  }
}

export default Container;
