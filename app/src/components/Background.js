// @flow
import React, { Component } from 'react';
import type { Children} from 'react';

export default class Background extends Component {
  props: {
    children: Children
  };

  render() {
    return (
      <div>
        <span>{ this.props.title }</span>
        <div>
          { this.props.children }
        </div>
      </div>
    );
  }
}
