// library
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// our files
import contentService from "../services/contentService.js";
import "./Selection.css";
import { viewConstants } from "../constants";
// import LandingTitle from "./LandingTitle";

// This component represents a generic "selection" screen that can show any list
// of items in a consistent fashion
// The `view` prop determines what items are shown, which is provided by the
// `contentService` (see contentService#getSelectionItems)
class Selection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: []
    };
  }

  componentDidMount() {
    contentService.getSelectionItems(this.props.view)
      .then(items => {
        this.setState({items});
      });

  }

  // Handle changes in the view prop - we need to reload the items
  componentDidUpdate(prevProps) {
    if (prevProps.view !== this.props.view) {
      this.componentDidMount();
    }
    console.log(this.props.view);
    if(this.props.view === viewConstants.MATERIALS) {
      document.body.style.backgroundColor = '#a9bb59';
    } else if(this.props.view === viewConstants.ACTIVITIES) {
      document.body.style.backgroundColor = '#79b4b3';
    } else if(this.props.view === viewConstants.WORDSEARCH) {
      document.body.style.backgroundColor = '#79b4b3';
    } else if(this.props.view === viewConstants.HELP) {
      document.body.style.backgroundColor = '#fc5e5a';
    } else if(this.props.view === viewConstants.ABOUT) {
      document.body.style.backgroundColor = '#a586c5';
    } 
  }

  render() {
    const itemsRendered = this.state.items.map(item => (
      <Link key={item.link} className="selection-category" to={item.link}>
        <div className="selection-category-content">
          <div className="selection-category-text">{item.name}</div>
        </div>
      </Link>
    ));

    // let mainStyle = {};
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
      <div className="selection-categories">
        {/* <LandingTitle>{this.props.items[0]}</LandingTitle> */}
        {itemsRendered}
      </div>
    );
  }
}

Selection.propTypes = {
  view: PropTypes.string.isRequired
};

export default Selection;
