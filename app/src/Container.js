// @flow
import React, { Component } from 'react';
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
    // TODO: menu and back button
    // TODO: title component with the explode logic from PHP
    return (
      <div id="portal-content" style={{minHeight: window.innerHeight, maxHeight: window.innerHeight}}>
        <img alt="top" id="portal-background-top" src={top}/>
        <img alt="bottom" id="portal-background-bottom" src={bottom}/>
        <img alt="left" id="portal-background-left" src={left}/>
        <img alt="right" id="portal-background-right" src={right}/>
        <div id="portal-header">
          <div className="portal-title">{ this.props.title }</div>
        </div>
        {this.props.children}
      </div>
    );
  }
}

export default Container;
