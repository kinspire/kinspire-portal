import { Typography } from "@material-ui/core";
import React, { Component } from "react";
import { Link } from "react-router-dom";

import { getColor, View } from "../constants";
import "./Header.css";

const SECTIONS = [
  // { name: "home", color: "#a586c5" },
  { name: "stories", link: "stories", color: getColor(View.STORIES) },
  { name: "word searches", link: "wordsearches", color: getColor(View.ACTIVITIES) },
  { name: "login", link: "login", color: getColor("BUTTON") },
  // { name: "materials", color: "#a9bb59" },
  // { name: "about", color: "#fc5e5a" },
  // {name: "help", color: "#fa8e47"},
  // "access",
  // {name: "profile", color: "#a586c5"}
  // "logout"
];

const TITLE_MAP: Record<string, string> = {
  P: getColor(View.STORIES),
  O: getColor(View.MATERIALS),
  R: getColor("HELP"),
  T: getColor(View.ABOUT),
  A: getColor(View.PROFILE),
  L: getColor("BUTTON"),
};

class Header extends Component {
  public render() {
    const menuItems = SECTIONS.map((section, i) => (
      <div key={i} className="portal-menu-item">
        <Link
          style={{ color: section.color }}
          to={`/${section.link}`}
          className="portal-menu-item-link"
        >
          <div className="portal-menu-item-icon" style={{ backgroundColor: section.color }} />
          <Typography>{section.name}</Typography>
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
