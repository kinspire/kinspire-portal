// @flow
import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./Header.css";

class Header extends Component {
  render() {
    const sections = [
      // "home",
      { name: "activities", color: "#79b4b3" },
      { name: "materials", color: "#a9bb59" },
      // { name: "help", color: "#fa8e47" },
      // "access",
      { name: "about", color: "#fc5e5a" },
      { name: "home", color: "#fa8e47" }
      // "logout"
    ];

    const menuItems = sections.map((section, i) => (
      <div key={i} className="portal-menu-item">
        <Link
          className={`portal-menu-item-${section.name}`}
          to={`/${section.name}`}
        >
          <div
            className="portal-menu-icon"
            style={{ backgroundColor: section.color }}
          />
          {section.name}
        </Link>
      </div>
    ));

    const title = (
      <div className="portal-title">
        <Link to="/">
          {"PORTAL".split("").map((x, i) => (
            <span className={`title-${x}`} key={i}>
              {x}
            </span>
          ))}
        </Link>
      </div>
    );

    //** Make this the footer **//
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
