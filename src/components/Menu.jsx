// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './Menu.css';
import menuMagnetInactive from '../images/owl-magnet-inactive.png';

// TODO component comment
// TODO copy images
class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };

    this.handleClick       = this.handleClick.bind(this);
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

    const menuItems = sections.map((section, i) => {
      const text = this.props.active === i ? (names[i]) : (
        <Link className={`portal-menu-item-${section}`} onClick={this.handleClick}
          to={`${urls[i]}`}>
          {names[i]}
        </Link>
      );

      // TODO: Change the hardcoded 25 height/width
      return (
        <div key={i} className="portal-menu-item">
          <img alt="" src={`/images/menu/${section}${this.props.active === i ? '-' : '-in'}active.png`} height="25" width="25"/>
          {text}
        </div>
      );
    }, this);

    const menuContent = (
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
            <img alt="" id="menu-magnet" src={menuMagnetInactive} height="60" width="60"/>
          </div>
        </div>
        {this.state.open ? menuContent : ''}
      </div>
    );
  }
}

Menu.propTypes = {
  active: PropTypes.number
};

export default Menu;
