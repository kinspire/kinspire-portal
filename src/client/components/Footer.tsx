import { Typography } from "@material-ui/core";
import React, { Component } from "react";
import "./Header.css";

class Footer extends Component {
  public render() {
    const footer = (
      <div>
        <Typography className="copyright">@Copyright Kinspire 2020</Typography>
        <Typography className="contact">
          Contact us with Questions: <br />
          board@kinspire.org
        </Typography>
      </div>
    );
    return <div className="portal-footer">{footer}</div>;
  }
}

export default Footer;
