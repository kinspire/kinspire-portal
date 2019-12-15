import log from "loglevel";
import React from "react";

import Scaffold from "../components/Scaffold";
import { View } from "../constants";

export default function Test() {
  const handleClick = async () => {
    log.debug("hi");
  };

  return (
    <Scaffold view={View.ACTIVITIES}>
      <div style={{ height: "100%" }}>
        <button onClick={handleClick}>Click</button>
      </div>
    </Scaffold>
  );
}
