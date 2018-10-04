// @flow
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import './Login.css';
import ShadowButton from '../components/ShadowButton';
import { authService } from '../services/authService';

class Login extends Component {
  constructor(props) {
    super(props);

    // confirm logout
    authService.logout();

    this.state = {username: ''};
  }

  handleChange(event) {
    this.setState({username: event.target.value});
  }

  handleKeyUp(event) {
    if (event.key === 'Enter') {
      this.handleSubmit();
    }
  }

  handleSubmit() {
    if (this.state.username) {
      authService.login(this.state.username)
        .then(() => {
          this.setState({loggedIn: true});
        })
        .catch(error => {
          this.setState({loginError: error});
        });
    } else {
      alert("Enter username");
    }
  }

  render() {
    if (this.state.loggedIn) {
      return <Redirect to={{pathname: "/"}}/>;
    } else if (this.state.loginError) {
      alert(this.state.loginError);
    }

    return (
      <div className="portal-body row">
        <div className="col">
          <ShadowButton height={200} text="First time?" to="/signup"/>
        </div>
        <div className="col">
          <div className="login-region">
            <div className="login-title">Welcome back!</div>
            <input
              className="login-textbox"
              onChange={this.handleChange.bind(this)}
              onKeyUp={this.handleKeyUp.bind(this)}
              placeholder="Username"
              value={this.state.username}/>
            <ShadowButton className="login-button"
              onClick={this.handleSubmit.bind(this)} text="Log in"/>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
