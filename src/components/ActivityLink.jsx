// @flow
import React, { Component } from 'react';

import ShadowButton from './ShadowButton';

export default class ActivityLink extends Component {
  propTypes: {
    type: PropTypes.string,
    num: PropTypes.number
  };

  render() {
    return (
      <ShadowButton to="/materials/story/1/0" text="Story"/>
    );
  }
}
