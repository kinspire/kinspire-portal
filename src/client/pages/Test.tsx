import React from "react";

import Scaffold from "../components/Scaffold";
import { View } from "../constants";

export default function Test() {
  const handleClick = async () => {
    console.log("hi");
  };

  return (
    <Scaffold view={View.ACTIVITIES}>
      <div style={{ height: "100%" }}>
        <button onClick={handleClick}>Click</button>
      </div>
    </Scaffold>
  );
}
