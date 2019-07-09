// library
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom"; 

// our files
import contentService from "../services/contentService.js";
import "./Selection.css";
import { viewConstants } from "../constants";

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
    contentService.getSelectionItems(this.props.view).then(items => {
      this.setState({ items });
    });
  }

  render() {
    if (this.props.view === viewConstants.MATERIALS) {
      document.body.style.backgroundColor = "#a9bb59";
      // document.body.style.setProperty("--portal-background-color", "#a9bb59");
      document.body.style.setProperty(
        "--selection-content-text-color",
        "#a9bb59"
      );
    } else if (this.props.view === viewConstants.ACTIVITIES) {
      document.body.style.backgroundColor = "#79b4b3";
      // document.body.style.setProperty("--portal-background-color", "#79b4b3");
      document.body.style.setProperty(
        "--selection-content-text-color",
        "#79b4b3"
      );
    } else if (this.props.view === viewConstants.STORIES) {
      document.body.style.backgroundColor = "#79b4b3";
      // document.body.style.setProperty("--portal-background-color", "#79b4b3");
      document.body.style.setProperty(
        "--selection-content-text-color",
        "#79b4b3"
      );
    } else if (this.props.view === viewConstants.WORDSEARCH) {
      document.body.style.backgroundColor = "#79b4b3";
      // document.body.style.setProperty("--portal-background-color", "#79b4b3");
      document.body.style.setProperty(
        "--selection-content-text-color",
        "#79b4b3"
      );
    } else if (this.props.view === viewConstants.ABOUT) {
      document.body.style.backgroundColor = "#fc5e5a";
      // document.body.style.setProperty("--portal-background-color", "#fc5e5a");
      document.body.style.setProperty(
        "--selection-content-text-color",
        "#fc5e5a"
      );
    }
    const itemsRendered = this.state.items.map(item => (
      <Link key={item.link} className="selection-category" to={item.link}>
        {/* <div className="selection-category-content"> */}
        <div className="selection-category-text">{item.name}</div>
        {/* </div> */}
      </Link>
    ));

    let mainStyle = {};
    //materials = #a9bb59;
    // activities = #79b4b3
    // if(this.props.view === viewConstants.MATERIALS) {
    //   mainStyle.backgroundColor = '#a9bb59';
    //   mainStyle.margin = 0;
    //   mainStyle.padding = 0;
    // } else if(this.props.view === viewConstants.ACTIVITIES) {
    //   mainStyle.backgroundColor = '#79b4b3';
    // }

    return (
<<<<<<< HEAD
      <div className = "selection-categories-container">
      <div className = "row-sm-8">
        <div className = "col-sm-8">
          <div className="selection-categories" style={mainStyle}>
            {itemsRendered}
        </div>
      </div>
      </div>
=======
      <div className="selection-content">
        <div className="selection-categories">{itemsRendered}</div>
>>>>>>> esha
      </div>
    );
  }
}

Selection.propTypes = {
  view: PropTypes.string.isRequired
};

export default Selection;

