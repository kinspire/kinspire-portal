import React, { useState } from "react";

// import App from "../App";
import { callElectronAuth } from "@app/services/electron";
import { setToken } from "@app/store/actions";
import { AuthArg } from "@common/messages";
import { Button, Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import Scaffold from "../components/Scaffold";
import { getColor, View } from "../constants";
import "./Authentication.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

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

  const handleChange = ({ target }) => {
    switch (target.name) {
      case "username":
        setUsername(target.value);
        break;
      case "password":
        setPassword(target.value);
        break;
    }
  };

  const handleLogin = async () => {
    // Log in
    const token: string = await callElectronAuth(AuthArg.LOGIN, { username, password });
    console.log("token", token);
    dispatch(setToken(token));
  };

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
            <Link to="/register" className="auth-link">
              Register Here.
            </Link>
          </Typography>
        </Typography>
      </div>
      <div className="authentication">
        <form className="auth-input-block" noValidate autoComplete="off">
          <Typography variant="h5" style={{ color: getColor(View.HOME) }}>
            USERNAME
          </Typography>
          <TextField name="username" variant="outlined" onChange={handleChange} value={username} />
          <Typography variant="h5" style={{ color: getColor(View.HOME) }}>
            PASSWORD
          </Typography>
          <TextField
            name="password"
            type="password"
            variant="outlined"
            onChange={handleChange}
            value={password}
          />
        </form>
        <Button style={{ backgroundColor: getColor(View.HOME) }} onClick={handleLogin}>
          <Link to="/home">LOGIN</Link>
        </Button>
      </div>
    </Scaffold>
  );
}
