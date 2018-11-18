import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";

import "./Back.css";
import backButton from "../images/back-grey-arrow.png";

class Back extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.history.goBack();
  }

  render() {
    return (
      <div className="portal-back">
        <div><img className="portal-back-arrow" src={backButton} alt=""/></div>
        <button className="portal-back-text" onClick={this.handleClick}>Back</button>
      </div>
    );
  }
}

Back.propTypes = {
  history: PropTypes.object
};

export default withRouter(Back);
