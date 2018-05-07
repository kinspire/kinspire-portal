// @flow
import { userService } from '../services/userService';
import React, { Component } from 'react';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {username: ''};

    // TODO nasty
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    this.setState({username: event.target.value});
  }

  handleClick() {
    // TODO make this a promise so it's async
    let user = userService.login(this.state.username);
    if (user) {
      alert("success");
    } else {
      alert("error");
    }
  }

  render() {
    return (
      <div>
        <input placeholder="Username" value={this.state.username} onChange={this.handleChange}/>
        <button name="login" onClick={this.handleClick}>Log in</button>
      </div>
    );
  }
}
