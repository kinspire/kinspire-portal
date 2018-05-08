// TODO: synchronize db
import React, { Component } from 'react';

import './SyncButton.css';

export default class SyncButton extends Component {
  handleClick(e) {

  }

  render() {
    return (
      <div className="sync-button" onClick={this.handleClick.bind(this)}>
        Synchronize
      </div>
    );
  }
}
