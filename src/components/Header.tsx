import React, { Component } from "react";
import { Link } from "react-router-dom";

import { Colors } from "../constants";
import "./Header.css";

const SECTIONS = [
  // "home",
  { name: "home", color: "#a586c5" },
  { name: "activities", color: "#79b4b3" },
  { name: "materials", color: "#a9bb59" },
  // "access",
  { name: "about", color: "#fc5e5a" },
  /*
      {name: "help", color: "#fa8e47"},
      // "access",
      {name: "profile", color: "#a586c5"}
      */
  // "logout"
];

const TITLE_MAP: Record<string, Colors> = {
  P: Colors.ACTIVITIES,
  O: Colors.MATERIALS,
  R: Colors.HELP,
  T: Colors.ABOUT,
  A: Colors.PROFILE,
  L: Colors.BUTTON,
};

class Header extends Component {
  public render() {
    const menuItems = SECTIONS.map((section, i) => (
      <div key={i} className="portal-menu-item">
        <Link style={{ color: section.color }} to={`/${section.name}`}>
          <div className="portal-menu-icon" style={{ backgroundColor: section.color }} />
          {section.name}
        </Link>
      </div>
    ));

    const title = (
      <div className="portal-title">
        <Link to="/">
          {"PORTAL".split("").map((x, i) => (
            <span style={{ color: TITLE_MAP[x] }} key={i}>
              {x}
            </span>
          ))}
        </Link>
      </div>
    );

    // ** Make this the footer **//
    // const menuContent = (
    //   <div className="portal-menu-content" id="menu-content">
    //     <div className="portal-menu-item-contact">
    //       Kinspire UW <br />
    //       Contact us: kinspire@uw.edu
    //       <br />
    //       2017
    //     </div>
    //   </div>
    // );

    return (
      <div className="portal-header">
        {title}
        <div className="menu-items">{menuItems}</div>
      </div>
    );
  }
}

export default Header;
