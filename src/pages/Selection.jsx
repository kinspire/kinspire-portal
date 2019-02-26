import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import contentService from "../services/contentService.js";

import "./Selection.css";

// This component represents a generic "selection" screen that can show any list
// of items in a consistent fashion
// The `view` prop determines what items are shown, which is provided by the
// `contentService` (see contentService#getSelectionItems)
class Selection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
    };
  }

  componentDidMount() {
    contentService.getSelectionItems(this.props.view, JSON.parse(localStorage.getItem('user')))
      .then(items => {
        this.setState({items});
      });
  }

  // Handle changes in the view prop - we need to reload the items
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
