import React from "react";
import PropTypes from "prop-types";

const LandingTitle = (props) => (
  <div>
    <div className='title'>{props.title}</div>
    <div className='caption'>{props.caption}</div>
  </div>
);
LandingTitle.prototypes = {
  title: PropTypes.string.isRequired,
  caption: PropTypes.string
};

export default LandingTitle;
