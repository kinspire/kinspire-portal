import React from "react";

import TextField from "@material-ui/core/TextField";
import "./Login.css";
import { Link, Typography } from "@material-ui/core";

interface Props {}

interface State {}

class Login extends React.Component<Props, State> {
  render() {
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
                style={{ backgroundColor: "white" }}
              />
            </div>
          </form>
          <button className="login-button">LOGIN >></button>
        </div>
        {/* Forgot password option needed */}
      </div>
    );
  }
}

export default Login;
