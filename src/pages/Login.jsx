// @flow
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './Login.css';
import ShadowButton from '../components/ShadowButton';
import { userActions } from '../actions/userActions';
import { store } from '../helpers/store';

class Login extends Component {
  constructor(props) {
    super(props);

    // confirm logout
    this.props.dispatch(userActions.logout());

    store.subscribe(this.handleStoreChange);

    this.state = {username: '', submitted: false};
  }

  handleStoreChange = () => {
    console.log(store.getState());
    if (store.getState().authentication.loggedIn) {
      this.setState({ loggedIn: true });
    }
  };

  handleChange = (event) => {
    this.setState({username: event.target.value});
  };

  handleKeyUp = (event) => {
    if (event.key === 'Enter') {
      this.handleSubmit();
    }
  };

  handleSubmit = () => {
    this.setState({ submitted: true });
    if (this.state.username) {
      this.props.dispatch(userActions.login(this.state.username));
    } else {
      alert("Enter username");
    }
  };

  render() {
    if (this.state.loggedIn) {
      return <Redirect to={{pathname: "/"}}/>;
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
            <ShadowButton className="login-button" onClick={this.handleSubmit.bind(this)} text="Log in"/>
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
