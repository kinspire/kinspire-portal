import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import swal from "sweetalert";

import "./Login.css";
import ShadowButton from "../components/ShadowButton";
import authService from "../services/authService";

// The login page.
class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {username: ""};

    this.handleChange       = this.handleChange.bind(this);
    this.handleKeyUp        = this.handleKeyUp.bind(this);
    this.handleSubmit       = this.handleSubmit.bind(this);
  }

  // Log out the user before opening the page
  componentDidMount() {
    authService.logout()
      .then(console.log("Logged out!"));
  }

  handleChange(event) {
    this.setState({username: event.target.value});
  }

  handleKeyUp(event) {
    if (event.key === "Enter") {
      this.handleSubmit();
    }
  }

  handleSubmit() {
    if (this.state.username) {
      authService.login(this.state.username)
        .then(() => {
          this.setState({loggedIn: true});
        })
        .catch(() => {
          swal("Username is incorrect");
          //this.setState({loginError: error});
        });
    } else {
      swal("Enter username");
    }
  }

  render() {
    if (this.state.loggedIn) {
      return <Redirect to={{pathname: "/"}}/>;
    } else if (this.state.loginError) {
      swal(this.state.loginError);
    }

    return (
      <div className="portal-body row">
        <div className="col">
          <ShadowButton height="200" text="First time?" to="/signup"/>
        </div>
        <div className="col">
          <div className="login-region">
            <div className="login-title">Welcome back!</div>
            <input
              className="login-textbox"
              onChange={this.handleChange}
              onKeyUp={this.handleKeyUp}
              placeholder="Username"
              value={this.state.username}/>
            <ShadowButton className="login-button"
              onClick={this.handleSubmit} text="Log in"/>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
