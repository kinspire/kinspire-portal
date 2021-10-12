import React from "react";
import { Text } from "react-native";
import { getColor, PageView } from "../../constants";

export default function () {
  return <Text style={{ backgroundColor: getColor(PageView.HOME) }}>Home</Text>;
}
