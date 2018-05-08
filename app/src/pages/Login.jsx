// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Login.css';
import ShadowButton from '../components/ShadowButton';
import { userActions } from '../actions/userActions';

class Login extends Component {
  constructor(props) {
    super(props);

    // confirm logout
    this.props.dispatch(userActions.logout());

    this.state = {username: '', submitted: false};
  }

  handleChange(event) {
    this.setState({username: event.target.value});
  }

  handleSubmit() {
    this.setState({ submitted: true });
    if (this.state.username) {
      this.props.dispatch(userActions.login(this.state.username));
    } else {
      alert("Enter username");
    }
  }

  render() {
    return (
      <div className="portal-body row">
        <div className="col">
          <ShadowButton height={200} text="First time?" to="/signup"/>
        </div>
        <div className="col">
          <div className="login-region">
            <div className="login-title">Welcome back!</div>
            <form onSubmit={this.handleSubmit.bind(this)}>
              <input
                className="login-textbox"
                onChange={this.handleChange.bind(this)}
                placeholder="Username"
                value={this.state.username}/>
              <ShadowButton className="login-button" onClick={this.handleSubmit.bind(this)} text="Log in"/>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

// original form
//
// <div>
//   <form onSubmit={this.handleSubmit.bind(this)}>
//     <input placeholder="Username" value={this.state.username} onChange={this.handleChange.bind(this)}/>
//     <button>Log in</button>
//   </form>
// </div>

// TODO is there any state in the store that we want to map to the props of this component?
// TODO if anything, the "logging in" field in the store that we can use to show information
// during the login process. As of now though, nothing.
export default connect()(Login);
