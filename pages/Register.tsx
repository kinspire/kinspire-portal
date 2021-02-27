import React from "react";

import { Link } from "react-router-native";
import { Button, Grid, Text } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Scaffold from "../components/Scaffold";
import { getColor, PageView } from "../constants";
import "./Authentication.css";

// interface Props {}

// interface State {}

export default class Register extends React.Component {
  public render() {
    return (
      <Scaffold view={PageView.LOGIN}>
        <View className="page-title">
          <Text variant="h1" style={{ color: getColor(PageView.HOME) }}>
            REGISTER
          </Text>
          <Text className="auth-descr">
            Fill out all the information below to sign-up! <br />
            <Link to="/login" className="auth-link">
              Go back to the Login page.
            </Link>
          </Text>
        </View>
        <View className="register-block">
          <form className="auth-input-block" noValidate autoComplete="off">
            <Grid container>
              <Grid item xs={4} className="individual-register-input">
                <Text variant="h5" style={{ color: getColor(PageView.HOME) }}>
                  FRIST NAME
                </Text>
                <TextField id="input-fName" label="" variant="outlined" />
              </Grid>
              <Grid item xs={4} className="individual-register-input">
                <Text variant="h5" style={{ color: getColor(PageView.HOME) }}>
                  LAST NAME
                </Text>
                <TextField id="input-lName" label="" variant="outlined" />
              </Grid>
              <Grid item xs={4} className="individual-register-input">
                <Text variant="h5" style={{ color: getColor(PageView.HOME) }}>
                  BIRTHDAY
                </Text>
                <TextField id="input-birthday" label="" variant="outlined" />
              </Grid>
              <Grid item xs={4} className="individual-register-input">
                <Text variant="h5" style={{ color: getColor(PageView.HOME) }}>
                  EMAIL ADDRESS
                </Text>
                <TextField id="input-email" label="" variant="outlined" />
              </Grid>
              <Grid item xs={4} className="individual-register-input">
                <Text variant="h5" style={{ color: getColor(PageView.HOME) }}>
                  USERNAME
                </Text>
                <TextField id="input-username" label="" variant="outlined" />
              </Grid>
              <Grid item xs={4} className="individual-register-input">
                <Text variant="h5" style={{ color: getColor(PageView.HOME) }}>
                  PASSWORD
                </Text>
                <TextField id="input-password" label="" variant="outlined" />
              </Grid>
            </Grid>
          </form>
          <Button style={{ backgroundColor: getColor(PageView.HOME) }}>
            <Link to="/home">SIGN UP</Link>
          </Button>
        </View>
        {/* Forgot password option needes */}
      </Scaffold>
    );
  }
}
