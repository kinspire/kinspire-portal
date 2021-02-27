import React from "react";

import Scaffold from "../components/Scaffold";
import { PageView } from "../constants";

export default function Test() {
  const handleClick = async () => {
    console.log("hi");
  };

  return (
    <Scaffold view={PageView.ACTIVITIES}>
      <View style={{ height: "100%" }}>
        <button onClick={handleClick}>Click</button>
      </View>
    </Scaffold>
  );
}
