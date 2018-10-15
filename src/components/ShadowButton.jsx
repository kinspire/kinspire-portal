// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './ShadowButton.css';

// TODO component comment
export default class ShadowButton extends Component {
  constructor(props) {
    super(props);

    this.handleClick        = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.props.onClick(e);
  }

  render() {
    // Determine children
    let children;
    if (this.props.children) {
      children = this.props.children;
    } else { // if (this.props.text) {
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
