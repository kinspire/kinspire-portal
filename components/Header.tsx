import React from "react";
import { StyleSheet } from "react-native";
import { Link, useLocation } from "react-router-native";
import { Text } from "react-native";
import { getColor, PageView } from "../constants";

const SECTIONS = [
  { name: "COURSES", link: "courses", color: getColor(PageView.COURSES) },
  // { name: "ACTIVITIES", link: "activities", color: getColor(View.ACTIVITIES) },
  // { name: "HOME", link: "home", color: getColor(View.HOME) },
  { name: "LOGOUT", link: "login", color: getColor(PageView.LOGOUT) },
];

const TITLE_MAP: Record<string, string> = {
  P: getColor(PageView.COURSES),
  O: getColor(PageView.ACTIVITIES),
  R: getColor("HELP"),
  T: getColor(PageView.ABOUT),
  A: getColor(PageView.PROFILE),
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
        <Text>{section.name}</Text>
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
      {/* {loc.pathname} */}
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

const styles = StyleSheet.create({
  "portal-menu": { textAlign: "center", zIndex: 9 },
  "portal-menu-item": {
    paddingLeft: 30,
    paddingTop: 10,
    fontFamily: "Rajdhani",
    textAlign: "center",
    margin: "15px 10px",
  },
  "portal-menu-item-link": { display: "flex", flexDirection: "column" },
  "portal-menu-item-icon": {
    height: 30,
    width: 30,
    borderRadius: 15,
    margin: "auto",
  },
  "menu-items": {
    position: "absolute",
    right: 0,
    display: "flex",
    paddingRight: 40,
  },
  "portal-title": {
    lineHeight: 60,
    fontSize: 40,
    letterSpacing: 10,
    textAlign: "center",
    fontFamily: "Montserrat",
    fontWeight: "bold",
    color: "white",
    padding: 20,
  },
  "portal-header": {
    width: "100%",
    display: "flex",
    backgroundColor: "#262626",
  },
});
