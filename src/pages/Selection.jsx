// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { viewConstants as v } from '../constants';

import './Selection.css';

// TODO move all of this someplace better
const materials = [
  {name: "Stories", link: "/materials/stories"},
  {name: "Templates", link: "/materials/templates"}
];
const activities = [
  // {name: "Word Search", link: "/activities/wordsearch"}
];

class Selection extends Component {
  getItems() {
    switch (this.props.view) {
    case v.MATERIALS:
      return materials;
    case v.ACTIVITIES:
      return activities;
    case v.STORIES:
      return [{name: "Story 1", link: "/materials/story/1/0"}];
    case v.WORDSEARCH:
      return []; // {name: "Story 1", link: "/activities/wsplay/1/0"}];
    default:
      return [];
    }
  }

  render() {
    const itemsRendered = this.getItems().map((item) => (
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
