import React, { Component } from "react";

import "./StoryCollection.css";

class StoryCollection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      caption: ""
    };
  }

  // Add title and caption from the component
  // Get individual story data
  // Each story has its own card
  // Format every card

  // title of page
  // cards
  // image
  // title
  // progress bar

  render() {
    return (
      <div>
        <div className="title">STORIES</div>
        <div className="subTitle">Click on a story to begin!</div>

        <div className="card">
          <div className="cardImg" />
          <div className="cardBody">
            Going to the Zoo
            <div className="cardProgress" />
          </div>
        </div>
      </div>
    );
  }
}

export default StoryCollection;
