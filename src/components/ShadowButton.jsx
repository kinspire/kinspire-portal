import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import "./ShadowButton.css";

// This is a brown button with a shadow that can be reused for consistency
// across the portal.
//
// The button content can be in two forms: either as children components, or as
// simple text. This is determined by which of the props are provided: `children`
// or `text`.
// The button link can also be in two forms: either a Link to a route, or with
// an `onClick` callback. This too is determined by which of the props are
// provided: `to` or `onClick`.
export default class ShadowButton extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.props.onClick(e);
  }

  render() {
    let children;
    if (this.props.children) {
      children = this.props.children;
    } else {
      const textStyle = {
        fontSize: this.props.textSize || undefined
      };
      children = <div className="shadow-button-text" style={textStyle}>{this.props.text}</div>;
    }

    const elementProps = {
      className: `${this.props.className || ""  } shadow-button`,
      style: {
        height: this.props.height || undefined,
        width: this.props.width || undefined
      }
    };

    // Determine HTML tag based on props
    if (this.props.onClick) {
      return <div onClick={this.props.onClick} {...elementProps}>
        {children}
      </div>;
    } else if (this.props.to) {
      return <Link to={this.props.to} {...elementProps}>
        {children}
      </Link>;
    } else {
      return "Shadow Button";
    }
  }
}

ShadowButton.propTypes = {
  children: PropTypes.element,
  className: PropTypes.string,
  height: PropTypes.string,
  onClick: PropTypes.func,
  text: PropTypes.string,
  textSize: PropTypes.number,
  to: PropTypes.string,
  width: PropTypes.string
};
