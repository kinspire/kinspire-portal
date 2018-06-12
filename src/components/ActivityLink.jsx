// @flow
import React, { Component } from 'react';

import ShadowButton from './ShadowButton';

export default class ActivityLink extends Component {
  propTypes: {
    classLevel: PropTypes.string.isRequired,
    num: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  };

  render() {
    const { classLevel, num, text, type } = this.props;
    return (
      <ShadowButton to={`/materials/${type}/${classLevel}/${num}`} text={text}/>
    );
  }
}
