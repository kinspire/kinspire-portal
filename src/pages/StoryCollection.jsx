import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

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

  render() {
    document.body.style.backgroundColor = "#bcd9d9";
    const content = this.state.items.map(item => (
      <Link className="card" key={item.link} to={item.link}>
        <div className="cardImg" onClick={item.link} />
        <div className="cardBody" onClick={item.link}>
          {item.name}
          <div className="cardProgress" />
        </div>
      </Link>
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
