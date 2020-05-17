import React from "react";

import TextField from "@material-ui/core/TextField";
import "./Login.css";

interface Props {}

interface State {}

class Login extends React.Component<Props, State> {
  render() {
    return (
      <div>
        <div className="authentication">
          <div className="login-title"> LOGIN </div>
          <form className="login-input-block" noValidate autoComplete="off">
            <div className="username">
              {" "}
              Username
              <TextField id="input-username" label="" variant="outlined" />
            </div>
            <div className="password">
              {" "}
              Password
              <TextField id="input-password" label="" variant="outlined" />
            </div>
          </form>
          <button className="login-button">SUBMIT</button>
        </div>
        {/* Forgot password option needes */}
      </div>
    );
  }
}

export default Login;
