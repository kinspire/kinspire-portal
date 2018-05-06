// @flow
import userService from '../services/userService';
import React, { Component } from 'react';

export default class Login extends Component {
  handleClick() {
    alert("Button clicked");
  }

  render() {
    return (
      <div>
        <input placeholder="Username"/>
        <button name="login" onClick={ this.handleClick }>Log in</button>
      </div>
    );
  }
}
