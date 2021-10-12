import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-native";
import { TOKEN_KEY } from "../services/storage";
import { useSelector } from "../store";
import { setToken } from "../store/user/actions";

export default function Header() {
  const token = useSelector((state) => state.userState.token);

  const dispatch = useDispatch();

  const loc = useLocation();

  const handleLogout = async () => {
    await AsyncStorage.removeItem(TOKEN_KEY);
    dispatch(setToken(undefined));
  };

  return (
    <View style={styles.header}>
      <Text>{loc.pathname}</Text>
      <Link to="/" component={TouchableOpacity} activeOpacity={0.8}>
        <Text>Home</Text>
      </Link>
      {token && (
        <>
          <Link to="/courses">
            <Text>Courses</Text>
          </Link>
          <View>
            <Button onPress={handleLogout} title="Logout" />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  location: {
    fontWeight: "bold",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
