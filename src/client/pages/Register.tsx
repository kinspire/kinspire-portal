import React from "react";

import Scaffold from "../components/Scaffold";
import { View } from "../constants";
import TextField from "@material-ui/core/TextField";
import "./Register.css";
import { Link, Typography, Grid } from "@material-ui/core";

interface Props {}

interface State {}

class Register extends React.Component<Props, State> {
  render() {
    return (
      <Scaffold view={View.LOGIN}>
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
        <div style={{ width: "80%", margin: "auto" }}>
          <Grid container>
            {/* <div className="pre-auth"> */}
            {/* <form className="register-input-block" noValidate autoComplete="off"> */}
            <Grid item xs={4}>
              <div className="input-title">
                {" "}
                FRIST NAME <br />
                <TextField
                  id="input-fName"
                  label=""
                  variant="outlined"
                  style={{ backgroundColor: "white" }}
                />
              </div>
            </Grid>
            <Grid item xs={4}>
              <div className="input-title">
                {" "}
                LAST NAME <br />
                <TextField
                  id="input-lName"
                  label=""
                  variant="outlined"
                  style={{ backgroundColor: "white" }}
                />
              </div>
            </Grid>
            <Grid item xs={4}>
              <div className="input-title">
                {" "}
                BIRTHDAY <br />
                <TextField
                  id="input-birthday"
                  label=""
                  variant="outlined"
                  style={{ backgroundColor: "white" }}
                />
              </div>
            </Grid>
            <Grid item xs={4}>
              <div className="input-title">
                {" "}
                EMAIL ADDRESS <br />
                <TextField
                  id="input-email"
                  label=""
                  variant="outlined"
                  style={{ backgroundColor: "white" }}
                />
              </div>
            </Grid>
            <Grid item xs={4}>
              <div className="input-title">
                {" "}
                USERNAME <br />
                <TextField
                  id="input-username"
                  label=""
                  variant="outlined"
                  style={{ backgroundColor: "white" }}
                />
              </div>
            </Grid>
            <Grid item xs={4}>
              <div className="input-title">
                {" "}
                PASSWORD <br />
                <TextField
                  id="input-password"
                  label=""
                  variant="outlined"
                  style={{ backgroundColor: "white" }}
                />
              </div>
            </Grid>
          </Grid>
          {/* </form> */}
          <Link className="login-button" href="/stories">
            SIGN UP >>
          </Link>
        </div>
        {/* Forgot password option needes */}
      </Scaffold>
    );
  }
}

export default Register;
