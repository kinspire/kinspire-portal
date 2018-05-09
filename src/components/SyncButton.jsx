// TODO: synchronize db
import React, { Component } from 'react';

import './SyncButton.css';
import ShadowButton from './ShadowButton';

export default class SyncButton extends Component {
  handleClick = (e) => {

  };

  render() {
    return (
      <ShadowButton onClick={this.handleClick} text="Synchronize"/>
    );
  }
}
