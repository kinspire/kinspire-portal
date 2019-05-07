import React, {Component} from "react";
import PropTypes from "prop-types";
import ShadowButton from "../components/ShadowButton";
import authService from "../services/authService";

class Profile extends Component {

  logout() {
    authService.logout().then(window.location.reload());
  }


  render() {
    const userString = localStorage.getItem("user");
    const user = JSON.parse(userString);
    const nameDisplay = `Name: ${user.firstName} ${user.lastName}`;
    const usernameDisplay = `Username: ${user.username}`;
    const classLevel = `Class Level: ${user.classLevel}`;
    const birthday = `Birthday: ${user.birthday}`;
    return (
      <div>
        <div className="flexbox">
          <label>{nameDisplay}</label>
        </div>
        <div className="flexbox">
          <label>{usernameDisplay}</label>
        </div>
        <div className="flexbox">
          <label>{classLevel}</label>
        </div>
        <div className="flexbox">
          <label>{birthday}</label>
        </div>
        <div>
          <ShadowButton onClick={this.logout} text="Log out"/>
        </div>
      </div>
    );
  }
}


Profile.propTypes = {
  match: PropTypes.object.isRequired
};

export default Profile;
