// @flow
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './Signup.css';
import ShadowButton from '../components/ShadowButton';
import { authActions } from '../actions/authActions';

class Signup extends Component {
  constructor(props) {
    super(props);

    // confirm logout
    this.props.dispatch(authActions.logout());

    this.state = {
      username: '', submitted: false
    };
  }

  handleChange = (key, event) => {
    this.setState({[key]: event.target.value});
  };

  handleKeyUp = (event) => {
    if (event.key === 'Enter') {
      this.handleSubmit();
    }
  };

  handleSubmit = () => {
    if (this.state.firstName && this.state.lastName && this.state.birthday && this.state.classLevel) {
      let {submitted, ...user} = this.state;
      this.props.dispatch(authActions.signup(user));
    } else {
      alert("Enter all details");
    }
  };

  render() {
    if (this.props.loggedIn) {
      return <Redirect to={{pathname: "/"}}/>;
    }

    let avatars = (
      "Choose avatar"
            // <?php
            // $directory = ($_SERVER['DOCUMENT_ROOT']."/images/avatar");
            // $files = array_diff(scandir($directory), array('..', '.'));
            //
            // foreach ($files as $file) {
            //   $name = trim(substr($file, 0, strlen($file) - 4)); ?>
            //   <div className="signup-avatar-container">
            //     <img className="signup-avatar" id="avatar-img-<?php echo $name;?>" src="/images/avatar/<?php echo $file; ?>">
            //       <input className="signup-avatar-radio" type="radio" name="avatar" id="avatar-<?php echo $name; ?>" value="avatar-<?php echo $name; ?>">
            //       </div>
            //       <?php }
            //       ?>
    );

    return (
      <div className="portal-body">
        <div className="flexbox">
          <span className="form-label">First Name:</span>
          <input
            onChange={this.handleChange.bind(this, 'firstName')}
            placeholder="First Name"
            type="text"
            value={this.state.firstName} />
        </div>
        <div className="flexbox">
          <span className="form-label">Last Name:</span>
          <input
            onChange={this.handleChange.bind(this, 'lastName')}
            placeholder="Last Name"
            type="text"
            value={this.state.lastName} />
        </div>
        <div className="flexbox">
          <span className="form-label">Birthday:</span>
          <input
            onChange={this.handleChange.bind(this, 'birthday')}
            type="date"
            value={this.state.birthday} />
        </div>
        <div className="flexbox">
          <span className="form-label">Class Level:</span>
          <input
            onChange={this.handleChange.bind(this, 'classLevel')}
            type="number"
            placeholder="Class Level"
            value={this.state.classLevel} />
        </div>
        <div className="signup-avatars">
          {avatars}
        </div>
        <ShadowButton className="signup-button"
          onClick={this.handleSubmit.bind(this)} text="Sign up!"/>
      </div>
    );
  }
}

function mapStoreToProps(state) {
  const { loggedIn } = state.authentication;
  return {
    loggedIn
  };
}
export default connect(mapStoreToProps)(Signup);
