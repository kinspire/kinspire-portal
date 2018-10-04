// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ShadowButton from './ShadowButton';

export default class ContentItemLink extends Component {
  render() {
    const { classLevel, num, title, type } = this.props;
    return (
      <ShadowButton to={`/materials/${type}/${classLevel}/${num}`} text={`${type}: ${title}`}/>
    );
  }
}

ContentItemLink.propTypes = {
  classLevel: PropTypes.string.isRequired,
  num: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
