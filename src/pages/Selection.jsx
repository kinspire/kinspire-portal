// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { viewConstants as v } from '../constants';

import './Selection.css';

// TODO move all of this someplace better
const materials = [
  {name: "Stories", link: "/materials/stories"},
  {name: "Templates", link: "/materials/templates"}
];
const activities = [
  {name: "Word Search", link: "/activities/wordsearch"}
];

export default class Selection extends Component {
  propTypes: {
    view: PropTypes.string.isRequired
  };

  getItems = () => {
    switch (this.props.view) {
      case v.MATERIALS:
        return materials;
      case v.ACTIVITIES:
        return activities;
      case v.STORIES:
        // TODO use redux
        return [{name: "Story 1", link: "/materials/story/1/0"}];
      case v.WORDSEARCH:
        // TODO use redux
        return [{name: "Story 1", link: "/activities/wsplay/1/0"}];
      default:
        return [];
    }
  };

  render() {
    let itemsRendered = this.getItems().map((item) => (
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
