import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-native";
import { TOKEN_KEY } from "../services/storage";
import { useSelector } from "../store";
import { setToken } from "../store/actions";

export default function Header() {
  const token = useSelector((state) => state.token);

  const dispatch = useDispatch();

  const loc = useLocation();

  const handleLogout = async () => {
    await AsyncStorage.removeItem(TOKEN_KEY);
    dispatch(setToken(undefined));
  };

  return (
    <View style={styles.header}>
      <Text>{loc.pathname}</Text>
      <Link to="/" style={styles.menuItem}>
        <Text>Home</Text>
      </Link>
      {token && (
        <>
          <Link to="/courses" style={styles.menuItem}>
            <Text>Courses</Text>
          </Link>
          <View style={styles.menuItem}>
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
    justifyContent: "center",
    alignItems: "center",
  },
  menuItem: {
    padding: 4,
  },
});
