// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './OldHome.css';

export default class OldHome extends Component {
  render() {
    return (
      <div>
        <div className={styles.container} data-tid="container">
          <h2>OldHome</h2>
          <Link to="/counter">to Counter</Link>
        </div>
      </div>
    );
  }
}
