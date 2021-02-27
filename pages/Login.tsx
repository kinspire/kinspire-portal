import React, { useState } from "react";
import { setLoading, setToken } from "../store/actions";
import { useDispatch } from "react-redux";
import { Link } from "react-router-native";
import Scaffold from "../components/Scaffold";
import { getColor, PageView } from "../constants";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { moodleLogin } from "../services/moodle/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_KEY = "userToken";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      setLoading(true);
      const token = await moodleLogin(username, password);
      setLoading(false);
      setToken(token);
      await AsyncStorage.setItem(TOKEN_KEY, token);

      alert("token " + token);
    } catch (err) {
      alert(err.toString());
    }
  };

  return (
    <Scaffold view={PageView.LOGIN}>
      <Text style={{ color: getColor(PageView.HOME) }}>LOGIN</Text>
      <Text style={styles["auth-descr"]}>
        Sign in with your username and password.
        <Text>
          New to Portal?
          <Link to="/register" style={styles["auth-link"]}>
            Register Here.
          </Link>
        </Text>
      </Text>
      <View style={styles["authentication"]}>
        <View style={styles["auth-input-block"]}>
          <Text style={{ color: getColor(PageView.HOME) }}>USERNAME</Text>
          <TextInput
            style={{ height: 40 }}
            placeholder="Username"
            onChangeText={(text) => setUsername(text)}
            textContentType="username"
            autoCompleteType="username"
            autoCapitalize="none"
            value={username}
          />
          <Text style={{ color: getColor(PageView.HOME) }}>PASSWORD</Text>

          <TextInput
            style={{ height: 40 }}
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
            textContentType="password"
            autoCompleteType="password"
            secureTextEntry={true}
            value={password}
          />
        </View>
        <Button color={getColor(PageView.HOME)} onPress={handleLogin} title="LOGIN" />
      </View>
    </Scaffold>
  );
}

const styles = StyleSheet.create({
  authentication: { margin: "auto", width: 300 },
  "auth-input-block": { marginBottom: 20, width: "100%" },
  "auth-descr": {
    color: "#908e8d",
    textAlign: "center",
    paddingBottom: 25,
  },
  "auth-link": {
    color: "#908e8d",
    fontFamily: '"Rajdhani"',
    fontWeight: "600",
  },
  "register-block": { margin: "auto", width: "75%", position: "relative" },
  "individual-register-input": { paddingRight: 25 },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
