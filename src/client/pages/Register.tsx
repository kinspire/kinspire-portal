import React from "react";

import TextField from "@material-ui/core/TextField";
import "./Register.css";
import { Link, Typography } from "@material-ui/core";

interface Props {}

interface State {}

class Register extends React.Component<Props, State> {
  render() {
    return (
      <div style={{ backgroundColor: "#262626" }}>
        <div className="page-title">
          <Typography variant="h1"> REGISTER </Typography>
          <Typography className="register-decr">
            Fill out all the information below to sign-up!
            <Link href="/login" className="login-link" underline="hover">
              {" "}
              <br />
              {"<< Go back to the Login page."}
            </Link>
          </Typography>
        </div>
        <div className="authentication">
          <form className="register-input-block" noValidate autoComplete="off">
            <div className="input-title">
              {" "}
              FRIST NAME
              <TextField
                id="input-fName"
                label=""
                variant="outlined"
                style={{ backgroundColor: "white" }}
              />
            </div>
            <div className="input-title">
              {" "}
              LAST NAME
              <TextField
                id="input-lName"
                label=""
                variant="outlined"
                style={{ backgroundColor: "white" }}
              />
            </div>
            <div className="input-title">
              {" "}
              BIRTHDAY
              <TextField
                id="input-birthday"
                label=""
                variant="outlined"
                style={{ backgroundColor: "white" }}
              />
            </div>
            <div className="input-title">
              {" "}
              EMAIL ADDRESS
              <TextField
                id="input-email"
                label=""
                variant="outlined"
                style={{ backgroundColor: "white" }}
              />
            </div>
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
          <Link className="login-button" href="/stories">
              SIGN UP >>
            </Link>
        </div>
        {/* Forgot password option needes */}
      </div>
    );
  }
}

export default Register;
