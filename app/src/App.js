// @flow
import React, { Component } from 'react';
import './App.css';
import top from './images/portal-top-bar.png';
import left from './images/portal-left-bar.png';
import bottom from './images/portal-bottom-bar.png';
import right from './images/portal-right-bar.png';

class App extends Component {
  props: {
    children: Children
  };

  // TODO set content height on resize

  render() {
    // TODO: menu and back button
    // TODO: title component with the explode logic from PHP
    return (
      <div id="portal-content" style={{"min-height": window.innerHeight, "max-height": window.innerHeight}}>
        <img id="portal-background-top" src={top}/>
        <img id="portal-background-bottom" src={bottom}/>
        <img id="portal-background-left" src={left}/>
        <img id="portal-background-right" src={right}/>
        <div id="portal-header">
          <div className="portal-title">{ this.props.title }</div>
        </div>
        {this.props.children}
      </div>
    );
  }
}

export default App;
