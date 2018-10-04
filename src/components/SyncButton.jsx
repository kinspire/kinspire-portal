// @flow
import React, { Component } from 'react';

import './SyncButton.css';
import ShadowButton from './ShadowButton';
import { remoteDbService } from '../services/remoteDbService';

class SyncButton extends Component {
  constructor(props) {
    super(props);

    this.handleUpload       = this.handleUpload.bind(this);
    this.handleDownload     = this.handleDownload.bind(this);
  }

  handleUpload() {
    remoteDbService.upload().then(() => {
      alert("uploaded!!!");
    });
  }

  handleDownload() {
    remoteDbService.download().then(() => {
      alert("dnloaded!!!");
    });
  }

  render() {
    return (
      <span>
        <ShadowButton onClick={this.handleUpload} text="Upload"/>
        <ShadowButton onClick={this.handleDownload} text="Download"/>
      </span>
    );
  }
}

export default SyncButton;
