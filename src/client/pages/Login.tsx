import React from "react";

import App from "../App";
import TextField from "@material-ui/core/TextField";
import "./Login.css";
import { Link, Typography } from "@material-ui/core";

interface Props {}

interface State {}

class Login extends React.Component<Props, State> {
  state = {
    authenticateUsername: false,
    authenticatePassword: false,
  };
  // get the username entered by the user
  // check if username exists in the database >> set state to true
  // if not throw error
  // get the password entered by the user
  // then check if password exists in the database >> set state to false
  // if not throw error
  // if both true then route app to the home page

  // SECOND PHASE
  // then select view according to credentials
  // then route app to that view

  handleUsername = (event) => {
    if (event.target.value === "Esha") {
      this.setState({ authenticateUsername: true });
    }
  };

  handlePassword = (event) => {
    if (event.target.value === "enter") {
      this.setState({ authenticatePassword: true });
    }
  };

  handleLogin = () => {
    if (this.state.authenticateUsername && this.state.authenticatePassword) {
      console.log("Success!");
    }
  };

  render() {
    console.log("Testing console message in login");
    return (
      <div style={{ backgroundColor: "#262626" }}>
        <div className="page-title">
          <Typography variant="h1">LOGIN</Typography>
          <Typography className="login-descr">
            Sign in with your username and password.
            <div className="register-link-descr">
              New to Portal?{" "}
              <Link href="/register" className="register-link" underline="hover">
                Register Here.
              </Link>
            </div>
          </Typography>
        </div>
        <div className="authentication">
          <form className="login-input-block" noValidate autoComplete="off">
            <div className="input-title">
              {" "}
              USERNAME
              <TextField
                id="input-username"
                label=""
                variant="outlined"
                onChange={this.handleUsername}
                style={{ backgroundColor: "white" }}
              />
            </div>
            <div className="input-title">
              {" "}
              PASSWORD
              <TextField
                id="input-password"
                label=""
                variant="outlined"
                onChange={this.handlePassword}
                style={{ backgroundColor: "white" }}
              />
            </div>
          </form>
          <div className="button">
            <Link className="login-button" href="/stories">
              LOGIN >>
            </Link>
          </div>
        </div>
        {/* Forgot password option needed */}
      </div>
    );
  }
}

export default Login;
