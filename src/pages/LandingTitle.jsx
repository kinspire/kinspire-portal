import React from "react";

class LandingTitle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: " ",
      caption: " "
    };
  }
  render() {
    return (
      <div>
        <div className="title">{this.state.title}</div>
        <div className="caption">{this.state.caption}</div>
      </div>
    );
  }
}

export default LandingTitle;
