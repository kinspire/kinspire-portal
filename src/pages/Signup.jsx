// @flow
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import './Signup.css';
import ShadowButton from '../components/ShadowButton';
import { authService } from '../services/authService';

class Signup extends Component {
  constructor(props) {
    super(props);

    // confirm logout
    authService.logout();

    this.state = {
      username: '',
      loggedIn: false,
    };

    this.handleChange       = this.handleChange.bind(this);
    this.handleSubmit       = this.handleSubmit.bind(this);
  }

  handleChange(key, event) {
    this.setState({[key]: event.target.value});
  }

  // TODO implement enter for signup
  handleKeyUp(event) {
    if (event.key === 'Enter') {
      this.handleSubmit();
    }
  }

  handleSubmit() {
    if (this.state.firstName && this.state.lastName && this.state.birthday && this.state.classLevel) {
      authService.signup(this.state)
        .then(() => {
          this.setState({loggedIn: true});
        });
    } else {
      alert("Enter all details");
    }
  }

  render() {
    if (this.state.loggedIn) {
      return <Redirect to={{pathname: "/"}}/>;
    }

    const avatars = (
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
          onClick={this.handleSubmit} text="Sign up!"/>
      </div>
    );
  }
}

export default Signup;
