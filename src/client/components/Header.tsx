import { DEBUG } from "@app/util";
import { Typography } from "@material-ui/core";
import React from "react";
import { Link, useLocation } from "react-router-dom";

import { getColor, View } from "../constants";
import "./Header.css";

const SECTIONS = [
  { name: "COURSES", link: "courses", color: getColor(View.COURSES) },
  // { name: "ACTIVITIES", link: "activities", color: getColor(View.ACTIVITIES) },
  // { name: "HOME", link: "home", color: getColor(View.HOME) },
  { name: "LOGOUT", link: "login", color: getColor(View.LOGOUT) },
];

const TITLE_MAP: Record<string, string> = {
  P: getColor(View.COURSES),
  O: getColor(View.ACTIVITIES),
  R: getColor("HELP"),
  T: getColor(View.ABOUT),
  A: getColor(View.PROFILE),
  L: getColor("BUTTON"),
};

export default function Header() {
  const loc = useLocation();

  // creates the page icon in the menu
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

  //creates the page title in the menu
  const title = (
    <div className="portal-title">
      <Link to="/">
        {"PORTAL".split("").map((x, i) => (
          <span style={{ color: TITLE_MAP[x] }} key={i}>
            {x}
          </span>
        ))}
      </Link>
      {DEBUG && loc.pathname}
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
