import React from "react";

import { Button, Grid, Link, Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Scaffold from "../components/Scaffold";
import { getColor, View } from "../constants";
import "./Authentication.css";

// interface Props {}

// interface State {}

class Register extends React.Component {
  public render() {
    return (
      <Scaffold view={View.LOGIN}>
        <div className="page-title">
          <Typography variant="h1" style={{ color: getColor(View.HOME) }}>
            {" "}
            REGISTER{" "}
          </Typography>
          <Typography className="auth-descr">
            Fill out all the information below to sign-up! <br />
            <Link href="/login" className="auth-link" underline="hover">
              Go back to the Login page.
            </Link>
          </Typography>
        </div>
        <div className="register-block">
          <form className="auth-input-block" noValidate autoComplete="off">
            <Grid container>
              <Grid item xs={4} className="individual-register-input">
                <Typography variant="h4" style={{ color: getColor(View.HOME) }}>
                  {" "}
                  FRIST NAME
                </Typography>
                <TextField id="input-fName" label="" variant="outlined" />
              </Grid>
              <Grid item xs={4} className="individual-register-input">
                <Typography variant="h4" style={{ color: getColor(View.HOME) }}>
                  {" "}
                  LAST NAME
                </Typography>
                <TextField id="input-lName" label="" variant="outlined" />
              </Grid>
              <Grid item xs={4} className="individual-register-input">
                <Typography variant="h4" style={{ color: getColor(View.HOME) }}>
                  {" "}
                  BIRTHDAY{" "}
                </Typography>
                <TextField id="input-birthday" label="" variant="outlined" />
              </Grid>
              <Grid item xs={4} className="individual-register-input">
                <Typography variant="h4" style={{ color: getColor(View.HOME) }}>
                  {" "}
                  EMAIL ADDRESS{" "}
                </Typography>
                <TextField id="input-email" label="" variant="outlined" />
              </Grid>
              <Grid item xs={4} className="individual-register-input">
                <Typography variant="h4" style={{ color: getColor(View.HOME) }}>
                  {" "}
                  USERNAME{" "}
                </Typography>
                <TextField id="input-username" label="" variant="outlined" />
              </Grid>
              <Grid item xs={4} className="individual-register-input">
                <Typography variant="h4" style={{ color: getColor(View.HOME) }}>
                  {" "}
                  PASSWORD{" "}
                </Typography>
                <TextField id="input-password" label="" variant="outlined" />
              </Grid>
            </Grid>
          </form>
          <Button style={{ backgroundColor: getColor(View.HOME) }}>
            <Link href="/home">SIGN UP</Link>
          </Button>
        </div>
        {/* Forgot password option needes */}
      </Scaffold>
    );
  }
}

export default Register;
