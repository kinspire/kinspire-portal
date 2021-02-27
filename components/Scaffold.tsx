import React from "react";
import { StyleSheet, View } from "react-native";

import { getColor, PageView } from "../constants";

interface Props {
  view: PageView;
}

// The main container for the Portal.
export default function Scaffold({ children, view }: React.PropsWithChildren<Props>) {
  // TODO propagate color up here, so the full page is colored
  return (
    <View style={{ ...styles["portal-container"], backgroundColor: getColor(view) }}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  "portal-container": {
    minHeight: "calc(100vh - 250px)",
    position: "relative",
    padding: "3% 0%",
  },
});
