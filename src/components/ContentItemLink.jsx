import React, { Component } from "react";
import PropTypes from "prop-types";

import ShadowButton from "./ShadowButton";
import { contentConstants as c, contentStrings as s } from "../constants";

export default class ContentItemLink extends Component {
  render() {
    const { classLevel, num, title, type } = this.props;
    return (
      <ShadowButton className="home-next-activity" to={`/materials/${type}/${classLevel}/${num}`}>
        <div className="shadow-button-text home-next-activity-category">{s[type]}</div>
        <div className="home-next-activity-details">{title}</div>
      </ShadowButton>
    );
  }
}

ContentItemLink.defaultProps = {
  classLevel: 0,
  num: 0,
  type: c.TYPE_TASK,
};

ContentItemLink.propTypes = {
  classLevel: PropTypes.number,
  num: PropTypes.number,
  title: PropTypes.string.isRequired,
  type: PropTypes.string,
};
