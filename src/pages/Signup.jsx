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
      firstName: "",
      lastName: "",
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
    if (this.state.firstName && this.state.lastName && this.state.birthday && this.verifyDate()) {
      authService.signup(this.state)
        .then(() => {
          this.setState({loggedIn: true});
        });
    } else {
      swal("Verify all details");
    }
  }

  verifyDate() {
    const date = this.state.birthday.split("-");
    // Verify that the birth year is between 1980 and 2020.
    const year = date[0] < 2020 && date[0] > 1980;

    // Verify that the birth month is between 1 and 12.
    const month = date[1] < 13 && date[1] > 0;

    // Verify that the birth day is between 1 and 31.
    // TODO: Modify the verification for each month (not all months have 31 days).
    const day = date[2] < 32 && date[2] > 0;
    return year && month && day;
  }

  render() {
    if (this.state.loggedIn) {
      return <Redirect to={{pathname: "/"}}/>;
    }

    return (
      <div className="portal-body">
        <div className="flexbox">
          <span className="form-label">First Name:</span>
          <input
            onChange={this.handleChange.bind(this, "firstName")}
            placeholder="First Name"
            type="text"
            value={this.state.firstName} />
        </div>
        <div className="flexbox">
          <span className="form-label">Last Name:</span>
          <input
            onChange={this.handleChange.bind(this, "lastName")}
            placeholder="Last Name"
            type="text"
            value={this.state.lastName} />
        </div>
        <div className="flexbox">
          <span className="form-label">Username:</span>
          <input
            onChange={this.handleChange.bind(this, "username")}
            placeholder={(this.state.firstName.toLowerCase() + this.state.lastName.toLowerCase())}
            type="text"
            value={this.state.username} />
        </div>
        <div className="flexbox">
          <span className="form-label">Birthday:</span>
          <input
            onChange={this.handleChange.bind(this, "birthday")}
            type="date"
            value={this.state.birthday} />
        </div>
        <div className="flexbox">
          <span className="form-label">Class Level:</span>
          <select
            value={this.state.classLevel}
            onChange={this.handleChange.bind(this, "classLevel")}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <div className="flexbox">
          <span className="form-label">Preferred Language:</span>
          <select
            value={this.state.preferredLanguage}
            onChange={this.handleChange.bind(this, "preferredLanguage")}>
            <option value="none">None</option>
            <option value="marathi">Marathi</option>
            <option value="telugu">Telugu</option>
          </select>
        </div>
        <ShadowButton className="signup-button" onClick={this.handleSubmit} text="Sign up!"/>
      </div>
    );
  }
}
