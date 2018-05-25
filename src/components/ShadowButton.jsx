// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './ShadowButton.css';

// TODO component comment
export default class ShadowButton extends Component {
  propTypes: {
    children: Children,
    className: PropTypes.string,
    height: PropTypes.string,
    onClick: PropTypes.func,
    text: PropTypes.string,
    textSize: PropTypes.number,
    to: PropTypes.string,
    width: PropTypes.string
  }

  handleClick = (e) => {
    e.preventDefault();
    this.props.onClick(e);
  };

  render() {
    // TODO definitely a better way to do this...
    let buttonStyle = {
      height: this.props.height || undefined,
      width: this.props.width || undefined
    };

    // Determine children
    let nested;
    if (this.props.children) {
      nested = this.props.children;
    } else { // if (this.props.text) {
      let textStyle = {
        fontSize: this.props.textSize || undefined
      }
      nested = <div className="shadow-button-text" style={textStyle}>{this.props.text}</div>;
    }

    // Determine HTML tag
    if (this.props.onClick) {
      return (
        <div
          className={(this.props.className || "") + " shadow-button"}
          onClick={this.props.onClick}
          style={buttonStyle}>
          {nested}
        </div>
      );
    } else if (this.props.to) {
      return (
        <Link
          className={(this.props.className || "") + " shadow-button"}
          to={this.props.to}
          style={buttonStyle}>
          {nested}
        </Link>
      );
    } else {
      return "Shadow Button";
    }
  }
}
