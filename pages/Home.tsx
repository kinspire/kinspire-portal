import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { moodleLogin } from "../services/moodle/auth";

const TOKEN_KEY = "userToken";

export default function Home() {
  const [savedToken, setSavedToken] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const token = await moodleLogin(username, password);
      setLoading(false);
      setSavedToken(token);
      await AsyncStorage.setItem(TOKEN_KEY, token);

      alert("token " + token);
    } catch (err) {
      alert(err.toString());
    }
  };

  useEffect(() => {
    const loader = async () => {
      const value = await AsyncStorage.getItem(TOKEN_KEY);
      if (value !== null) {
        setSavedToken(value.toString());
      }
    };

    loader();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Stored token:</Text>
      <Text style={{ fontWeight: "bold" }}>{savedToken}</Text>
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
      <Button onPress={onLogin} title="Press Me" />
      <StatusBar style="auto" />
      {loading && <ActivityIndicator />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
