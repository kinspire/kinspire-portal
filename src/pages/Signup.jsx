import React, {Component} from "react";
import {Redirect} from "react-router-dom";
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

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    if (this.state.firstName && this.state.lastName && this.state.birthday &&
      this.state.classLevel && this.state.career && this.state.language && this.verifyData()) {
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
      <div className="portal-body signup" style={{backgroundColor: "#a586c5"}}>
        <div className='signup-title'>CREATE AN ACCOUNT</div>
        <div className="signup-region">

          <div className="column">
            <div className="flexbox">
              <h5>First Name</h5>
              <input
                className="login-textbox"
                onChange={this.handleChange.bind(this, "firstName")}
                placeholder="type..."
                type="text"
                value={this.state.firstName}/>
            </div>
            <div className="flexbox">
              <h5>Username</h5>
              <input
                className="login-textbox"
                onChange={this.handleChange.bind(this, "username")}
                placeholder="type..."
                type="text"
                value={this.state.username}/>
            </div>
            <div className="flexbox">
              <h5>Language</h5>
              <input
                className="login-textbox"
                onChange={this.handleChange.bind(this, "language")}
                type="text"
                placeholder="language"
                value={this.state.language}/>
            </div>
            <div className="flexbox">
              <h5>Birthday</h5>
              <input
                className="login-textbox"
                onChange={this.handleChange.bind(this, "birthday")}
                type="date"
                value={this.state.birthday}/>
            </div>
          </div>

          <div className="column">
            <div className="flexbox">
              <h5>Last Name</h5>
              <input
                className="login-textbox"
                onChange={this.handleChange.bind(this, "lastName")}
                placeholder="type..."
                type="text"
                value={this.state.lastName}/>
            </div>
            <div className="flexbox">
              <h5>Password</h5>
              <input
                className="login-textbox"
                onChange={this.handleChange.bind(this, "password")}
                placeholder="type..."
                type="password"
                value={this.state.password}/>
            </div>
            <div className="flexbox">
              <h5>Class Level</h5>
              <input
                className="login-textbox"
                onChange={this.handleChange.bind(this, "classLevel")}
                type="number"
                placeholder="Class Level"
                value={this.state.classLevel}/>
            </div>
            <div className="flexbox">
              <h5>Career Goal</h5>
              <input
                className="login-textbox"
                onChange={this.handleChange.bind(this, "career")}
                placeholder="type..."
                type="text"
                value={this.state.career}/>
            </div>
          </div>
        </div>

        <div className="signup-button-area">
          <ShadowButton className="signup-button" onClick={this.handleSubmit} text="CREATE YOUR ACCOUNT"/>
        </div>
      </div>
    );
  }
}
