import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import swal from "sweetalert";

import "./Login.css";
import ShadowButton from "../components/ShadowButton";
import authService from "../services/authService";

// The login page.
class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {username: ""};

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
          <div className="login-region">
            <div className="login-title">LOG-IN</div>
            <div className="user-info">
              <h2> Username </h2>
              <input
                className="login-textbox"
                onChange={this.handleChange}
                onKeyUp={this.handleKeyUp}
                placeholder="type..."
                value={this.state.username}/>
              <h2> Password </h2>
              <input
                className="login-textbox"
                onChange={this.handleChange}
                onKeyUp={this.handleKeyUp}
                placeholder="type..."
                value={this.state.password}/>
              <h3><a href=""> Forgot Password </a></h3>
            </div>
            <br/>
            <ShadowButton className="login-button"
              onClick={this.handleSubmit} text="Login"/>
          </div>
          <div className="sign-up">Don't have an account?
            <a href="/signup" className="create-account"> CREATE AN ACCOUNT</a></div>
        </div>
      </div>
    );
  }
}

export default Login;
