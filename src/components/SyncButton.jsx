// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';

import './SyncButton.css';
import ShadowButton from './ShadowButton';
import { remoteDbActions } from '../actions/remoteDbActions';

class SyncButton extends Component {
  handleClick = (e) => {
    if (!this.props.synchronized) {
      this.props.dispatch(remoteDbActions.sync());
    } else {
      alert("Already synchronized");
    }
  };

  render() {
    if (this.props.synchronized) {
      alert("SYNCHRONIZED!!!");
    }

    return (
      <ShadowButton onClick={this.handleClick} text="Synchronize"/>
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
