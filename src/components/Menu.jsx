// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Menu.css';
import menuMagnetInactive from '../images/owl-magnet-inactive.png';

// TODO component comment
export default class Menu extends Component {
  propTypes: {
    active: PropTypes.number
  };

  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleClick = (event) => {
    this.setState({
      open: !this.state.open
    });
  }

  render() {
    let sections = ["home", "resources", "activities", "access", "profile", "logout"];
    let urls = ["", "/materials", "/activities", "/volunteer-access", "/profile", "/login"];
    let names = ["Home", "Materials", "Activities", "Volunteer Access", "Profile", "Log out"];

    let menuItems = sections.map((section, i) => {
      let text = this.props.active === i ? (names[i]) : (
        <Link className={`portal-menu-item-${section}`} onClick={this.handleClick}
          to={`${urls[i]}`}>
          {names[i]}
        </Link>
      );

      // TODO: Change the hardcoded 25 height/width
      return (
        <div key={i} className="portal-menu-item">
          <img src={`/images/${section}${this.props.active === i ? '-' : '-in'}active.png`} height="25" width="25"/>
          {text}
        </div>
      );
    }, this);

    let menuContent = (
      <div className="portal-menu-content" id="menu-content">
        {menuItems}
        <div className="portal-menu-item-contact">
          Kinspire UW <br/>Contact us: kinspire@uw.edu<br/>2017
        </div>
      </div>
    );

    // TODO change the inactive/active of the menu magnet

    return (
      <div className="portal-menu">
        <div className="portal-menu-title" onClick={this.handleClick} id="menu-title">
          <div>menu</div>
          <div>
            <img id="menu-magnet" src={menuMagnetInactive} height="60" width="60"/>
          </div>
        </div>
        {this.state.open ? menuContent : ''}
      </div>
    );
  }
}
