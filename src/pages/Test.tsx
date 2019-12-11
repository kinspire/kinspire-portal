import log from "loglevel";
import * as React from "react";

import { login } from "../services/moodle";

export default function Test() {
  const handleClick = async () => {
    log.debug(await login("teststudent", "Password1!"));
  };

  return <button onClick={handleClick}>Click</button>;
}
