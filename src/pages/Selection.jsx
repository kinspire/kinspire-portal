// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Selection.css';

export default class Selection extends Component {
  propTypes: {
    items: PropTypes.array.isRequired
  };

  render() {
    let itemsRendered = this.props.items.map((item) => (
      <Link className="selection-category" to={item.link}>
        <div className="selection-category-content">
          <div className="selection-category-text">{item.name}</div>
        </div>
      </Link>
    ));

    return (
      <div className="selection-categories">
        {itemsRendered}
      </div>
    );
  }
}
