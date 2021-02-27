import { StyleSheet, Text } from "react-native";
import React, { Component } from "react";

class Footer extends Component {
  public render() {
    const footer = (
      <div>
        <Text style={{ fontSize: 24 }}>@Copyright Kinspire 2020</Text>
        <Text style={{ fontSize: 24 }}>
          Contact us with Questions: <br />
          portal@kinspire.org
        </Text>
      </div>
    );
    return <div className="portal-footer">{footer}</div>;
  }
}

export default Footer;

const styles = StyleSheet.create({
  copyright: { width: "40%", /*cssFloat: "left",*/ padding: "1%" },
  contact: {
    // cssFloat: "right",
    width: "40%",
    textAlign: "right",
    padding: "1%",
  },
  "portal-footer": {
    width: "100%",
    backgroundColor: "#262626",
    display: "flex",
    marginBottom: "-50px",
  },
});
