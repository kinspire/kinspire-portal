import React, { Component } from "react";
import PropTypes from "prop-types";

import "./StoryCollection.css";
import contentService from "../services/contentService.js";

class StoryCollection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: []
    };
  }

  componentDidMount() {
    contentService.getSelectionItems(this.props.view).then(items => {
      this.setState({ items });
    });
  }

  // title of page
  // cards
  // image
  // title
  // progress bar

  render() {
    const content = this.state.items.map(item => (
      <div className="card" key={item.link}>
        <div className="cardImg" />
        <div className="cardBody">
          {item.name}
          <div className="cardProgress" />
        </div>
      </div>
    ));
    return (
      <div>
        <div className="title">STORIES</div>
        <div className="subTitle">Click on a story to begin!</div>
        <div className="story-collection">{content}</div>
      </div>
    );
  }
}

Selection.propTypes = {
  view: PropTypes.string.isRequired
};

export default StoryCollection;
