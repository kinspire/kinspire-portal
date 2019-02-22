import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import swal from "sweetalert";

import "./Signup.css";
import ShadowButton from "../components/ShadowButton";
import authService from "../services/authService";

export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      loggedIn: false,
    };

    this.handleChange       = this.handleChange.bind(this);
    this.handleSubmit       = this.handleSubmit.bind(this);
  }

  // Log out the user before opening the page
  componentDidMount() {
    authService.logout()
      .then(console.log("logged out"));
  }

  handleChange(key, event) {
    this.setState({[key]: event.target.value});
  }

  handleKeyUp(event) {
    if (event.key === "Enter") {
      this.handleSubmit();
    }
  }

  handleSubmit() {
    // Only submit if all the fields are filled out
    if (this.state.firstName && this.state.lastName && this.state.birthday && this.state.classLevel) {
      authService.signup(this.state)
        .then(() => {
          this.setState({loggedIn: true});
        });
    } else {
      swal("Enter all details");
    }
  }

  render() {
    if (this.state.loggedIn) {
      return <Redirect to={{pathname: "/"}}/>;
    }

    return (
      <div className="portal-body">
        <div className="col">
          <div className="signup-region">
            <div className='signup-title'>SIGN-UP</div>
              <h2>First Name:</h2>
              <input
                className="login-textbox"
                onChange={this.handleChange.bind(this, "firstName")}
                placeholder="type..."
                type="text"
                value={this.state.firstName} />
            <div className="flexbox">
              <h2>Last Name:</h2>
              <input
                className="login-textbox"
                onChange={this.handleChange.bind(this, "lastName")}
                placeholder="Last Name"
                type="text"
                value={this.state.lastName} />
            </div>
            <div className="flexbox">
              <h2>Birthday:</h2>
              <input
                className="login-textbox"
                onChange={this.handleChange.bind(this, "birthday")}
                type="date"
                value={this.state.birthday} />
            </div>
            <div className="flexbox">
              <h2>Class Level:</h2>
              <input
                className="login-textbox"
                onChange={this.handleChange.bind(this, "classLevel")}
                type="number"
                placeholder="Class Level"
                value={this.state.classLevel} />
            </div>
            <ShadowButton className="signup-button"
              onClick={this.handleSubmit} text="Sign up!"/>
          </div>
        </div>
      </div>
    );
  }
}
