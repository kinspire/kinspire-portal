// @flow
import React, { Component } from 'react';

import './ShadowButton.css';

export default class ShadowButton extends Component {
  propTypes: {
    className: PropTypes.string,
    height: PropTypes.string,
    onClick: PropTypes.func,
    text: PropTypes.string.isRequired,
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
    let textStyle = {
      fontSize: this.props.textSize || undefined
    }

    return (
      <a
        className={(this.props.className || "") + " shadow-button"}
        href={this.props.to}
        onClick={this.props.onClick ? this.handleClick : undefined}
        style={buttonStyle}>
        <div className="shadow-button-text" style={textStyle}>{this.props.text}</div>
      </a>
    );
  }
}
