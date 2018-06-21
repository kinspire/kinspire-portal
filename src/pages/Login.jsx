// @flow
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './Login.css';
import ShadowButton from '../components/ShadowButton';
import { userActions } from '../actions/userActions';

class Login extends Component {
  constructor(props) {
    super(props);

    // confirm logout
    this.props.dispatch(userActions.logout());

    this.state = {username: ''};
  }

  handleChange = (event) => {
    this.setState({username: event.target.value});
  };

  handleKeyUp = (event) => {
    if (event.key === 'Enter') {
      this.handleSubmit();
    }
  };

  handleSubmit = () => {
    if (this.state.username) {
      this.props.dispatch(userActions.login(this.state.username));
    } else {
      alert("Enter username");
    }
  };

  render() {
    if (this.props.loggedIn) {
      return <Redirect to={{pathname: "/"}}/>;
    }
    // TODO add a "login error handled action"
    /*else if (this.props.loginError) {
      alert("Login error");
    }*/

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

// Maps store changes to prop changes
function mapStateToProps(state) {
  const { loggedIn, error } = state.authentication;
  return {
    loggedIn, loginError: error
  };
}
export default connect(mapStateToProps)(Login);
