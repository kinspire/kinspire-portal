// @flow
import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./Menu.css";
import menuMagnetInactive from "../images/owl-magnet-inactive.png";

// The menu component that is rendered in the upper left corner at all times.
class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      open: !this.state.open
    });
  }

  render() {
    const sections = ["home", "resources", "activities", "access", "profile", "logout"];
    const urls = ["", "/materials", "/activities", "/volunteer-access", "/profile", "/login"];
    const names = ["Home", "Materials", "Activities", "Volunteer Access", "Profile", "Log out"];

    const menuItems = sections.map((section, i) => (
      <div key={i} className="portal-menu-item">
        <Link className={`portal-menu-item-${section}`} onClick={this.handleClick}
          to={`${urls[i]}`}>
          {names[i]}
        </Link>
      </div>
    ));

    const menuContent = (
      <div className="portal-menu-content" id="menu-content">
        {menuItems}
        <div className="portal-menu-item-contact">
          Kinspire UW <br/>Contact us: kinspire@uw.edu<br/>2017
        </div>
      </div>
    );

    return (
      <div className="portal-menu">
        <div className="portal-menu-title" onClick={this.handleClick} id="menu-title">
          <div>menu</div>
          <div>
            <img alt="" id="menu-magnet" src={menuMagnetInactive} height="60" width="60"/>
          </div>
        </div>
        {this.state.open ? menuContent : ""}
      </div>
    );
  }
}

export default Menu;
