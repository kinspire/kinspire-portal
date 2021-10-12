import React, { useState } from "react";
import { setToken } from "../store/user/actions";
import { useDispatch } from "react-redux";
import { getColor, PageView } from "../../constants";
import { Button, Text, TextInput, View } from "react-native";
import { moodleLogin } from "../services/moodle/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TOKEN_KEY } from "../services/storage";
import { setLoading } from "../store/ui/actions";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      dispatch(setLoading(true));
      const token = await moodleLogin(username, password);
      if (token) {
        dispatch(setToken(token));
        await AsyncStorage.setItem(TOKEN_KEY, token);
      } else {
        alert("undefined token returned");
      }
    } catch (err) {
      alert(err.toString());
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <View>
      <Text>Sign in with your username and password.</Text>
      <TextInput
        style={{ height: 40 }}
        placeholder="Username"
        onChangeText={(text) => setUsername(text)}
        textContentType="username"
        autoCompleteType="username"
        autoCapitalize="none"
        value={username}
      />
      <TextInput
        style={{ height: 40 }}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        textContentType="password"
        autoCompleteType="password"
        secureTextEntry={true}
        value={password}
      />
      <Button color={getColor(PageView.HOME)} onPress={handleLogin} title="LOGIN" />
    </View>
  );
}
