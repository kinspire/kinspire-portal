// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { contentService } from '../services/contentService.js';

import './Selection.css';

class Selection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
    };
  }

  componentDidMount() {
    // TODO Instead of just emptying items, make a loading thing
    this.setState({
      items: []
    }, () => {
      contentService.getSelectionItems(this.props.view)
        .then(items => {
          this.setState({items});
        });
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.view !== this.props.view) {
      this.componentDidMount();
    }
  }

  render() {
    const itemsRendered = this.state.items.map((item) => (
      <Link key={item.link} className="selection-category" to={item.link}>
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

Selection.propTypes = {
  view: PropTypes.string.isRequired
};

export default Selection;
