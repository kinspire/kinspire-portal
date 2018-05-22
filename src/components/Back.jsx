// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Back.css';
import backButton from '../images/back-grey-arrow.png';

export default class Back extends Component {
  render() {
    // TODO actually use history and add a link to go back
    return (
      <div class="portal-back">
        <div><img class="portal-back-arrow" src={backButton}/></div>
        <div class="portal-back-text">Back</div>
      </div>
    );
  }
}
