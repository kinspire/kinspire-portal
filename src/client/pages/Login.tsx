import React from "react";

// import App from "../App";
import { Button, Link, Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Scaffold from "../components/Scaffold";
import { getColor, View } from "../constants";
import "./Authentication.css";

interface Props {}

interface State {}

class Login extends React.Component<Props, State> {
  public state = {
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

  public handleUsername = (event) => {
    if (event.target.value === "Esha") {
      this.setState({ authenticateUsername: true });
    }
  };

  public handlePassword = (event) => {
    if (event.target.value === "enter") {
      this.setState({ authenticatePassword: true });
    }
  };

  public handleLogin = () => {
    if (this.state.authenticateUsername && this.state.authenticatePassword) {
      console.log("Success!");
      // not sure how route here
    }
  };

  public render() {
    console.log("Testing console message in login");
    return (
      <Scaffold view={View.LOGIN}>
        <div className="page-title">
          <Typography variant="h1" style={{ color: getColor(View.HOME) }}>
            LOGIN
          </Typography>
          <Typography className="auth-descr">
            Sign in with your username and password.
            <Typography className="register-link-descr">
              New to Portal?
              <Link href="/register" className="auth-link" underline="hover">
                {" "}
                Register Here.
              </Link>
            </Typography>
          </Typography>
        </div>
        <div className="authentication">
          <form className="auth-input-block" noValidate autoComplete="off">
            <Typography variant="h4" style={{ color: getColor(View.HOME) }}>
              USERNAME
            </Typography>
            <TextField
              id="input-username"
              label=""
              variant="outlined"
              onChange={this.handleUsername}
            />
            <Typography variant="h4" style={{ color: getColor(View.HOME) }}>
              PASSWORD
            </Typography>
            <TextField
              id="input-password"
              label=""
              variant="outlined"
              onChange={this.handlePassword}
            />
          </form>
          <Button style={{ backgroundColor: getColor(View.HOME) }}>
            <Link href="/home">LOGIN</Link>
          </Button>
        </div>
      </Scaffold>
    );
  }
}

export default Login;
