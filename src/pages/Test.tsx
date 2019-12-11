import log from "loglevel";
import React from "react";

import { login } from "../content/moodle";

export default function Test() {
  const handleClick = async () => {
    log.debug(await login("teststudent", "Password1!"));
  };

  return <button onClick={handleClick}>Click</button>;
}
