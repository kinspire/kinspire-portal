import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Profile.css";


class Profile extends Component {
  render(){
    const userString = localStorage.getItem("user");
    const user = JSON.parse(userString);
    const nameDisplay = `Name: ${user.firstName} ${user.lastName}`;
    const usernameDisplay = `Username: ${  user.username}`;
    const classLevel = `Class Level: ${  user.classLevel}`;
    const birthday = `Birthday: ${ user.birthday}`;
    return `${nameDisplay  } ${  usernameDisplay  } ${  classLevel} ${  birthday}`;
  }
}


Profile.propTypes = {
  match: PropTypes.object.isRequired
};

export default Profile;
