import React from "react";

import Scaffold from "../components/Scaffold";
import Selection from "../components/GridSelection";
import { View } from "../constants";

import "./Home.css";
import { Typography } from "@material-ui/core";

export default function Home() {
  const view = View.HOME;

  return (
    <Scaffold view={view}>
      <div className="home-container">
        <Typography variant="h2">Welcome to Kinspire's Portal!</Typography>
        <Typography>Select something from the menu to get started!</Typography>
      </div>
    </Scaffold>
  );
}

/*
import { Paper } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

import Scaffold from "../components/Scaffold";
import { View } from "../constants";

// import ShadowButton from "../components/ShadowButton";
// import { contentConstants as c, contentStrings as s } from "../constants";
// import tasksService from "../services/tasksService";

import "./Home.css";

// The home page
export default function Home() {
  return (
    <Scaffold view={View.HOME}>
      <Paper className="home-activities-link">
        <Link to="" className="home-activities-container">
          Activities
        </Link>
      </Paper>
    </Scaffold>
  );
}

// Small wrapper around ShadowButton for home page content items.
/*
class ContentItemLink extends Component {
  public render() {
    // const { classLevel, num, taskId, title, type } = this.props;
    // const link = (type === c.TYPE_TASK ? `/task/${taskId}` : `/materials/${type}/${classLevel}/${num}`);
    return (
      <div></div>
      // <ShadowButton className="home-next-activity" to={link}>
      //   <div className="shadow-button-text home-next-activity-category">{s[type]}</div>
      //   <div className="home-next-activity-details">{title}</div>
      // </ShadowButton>
    );
  }
}

ContentItemLink.defaultProps = {
  classLevel: 0,
  num: 0,
  taskId: "",
  type: c.TYPE_TASK,
};

ContentItemLink.propTypes = {
  classLevel: PropTypes.number,
  num: PropTypes.number,
  taskId: PropTypes.string,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
*/
