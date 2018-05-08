// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';

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
    const { dispatch } = this.props;
    if (this.state.username) {
      dispatch(userActions.login(this.state.username));
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input placeholder="Username" value={this.state.username} onChange={this.handleChange.bind(this)}/>
          <button>Log in</button>
        </form>
      </div>
    );
  }
}

// TODO is there any state in the store that we want to map to the props of this component?
// TODO if anything, the "logging in" field in the store that we can use to show information
// during the login process. As of now though, nothing.
export default connect()(Login);
