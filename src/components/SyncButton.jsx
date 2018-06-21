// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';

import './SyncButton.css';
import ShadowButton from './ShadowButton';
import { remoteDbActions } from '../actions/remoteDbActions';

class SyncButton extends Component {
  handleUpload = (e) => {
    if (!this.props.synchronizing) {
      this.props.dispatch(remoteDbActions.upload());
    } else {
      alert("Already synchronizing");
    }
  };

  handleDownload = (e) => {
    if (!this.props.synchronizing) {
      this.props.dispatch(remoteDbActions.download());
    } else {
      alert("Already synchronizing");
    }
  };

  render() {
    if (this.props.synchronized) {
      alert("SYNCHRONIZED!!!");
    }

    return (
      <span>
        <ShadowButton onClick={this.handleUpload} text="Upload"/>
        <ShadowButton onClick={this.handleDownload} text="Download"/>
      </span>
    );
  }
}

// Maps store changes to prop changes
function mapStateToProps(state) {
  const { synchronized } = state.remoteDb;
  return {
    synchronized
  };
}
export default connect(mapStateToProps)(SyncButton);
