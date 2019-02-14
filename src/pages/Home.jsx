import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import PropTypes from "prop-types";

import "./Home.css";
import ShadowButton from "../components/ShadowButton";
import envelopeWithMedal from "../images/home-page-envelope-with-medal.png";
import tasksService from "../services/tasksService";
import { contentConstants as c, contentStrings as s } from "../constants";

// The home page
export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
    };
  }

  componentDidMount() {
    tasksService.getTasks()
      .then(tasks => {
        this.setState({tasks});
      });
  }

  getContentLinks() {
    return this.state.tasks.map((task, i) => (
      <ContentItemLink key={i} taskId={task.id} title={task.title}/>
    ));
  }

  render() {
    return (
      <div className="portal-body row">
        <div className="col-3">
          <div className="home-section-date">
            <div className="home-section-title">Today&#39;s date</div>
            <div className="home-section-content">{moment().format("ddd D/M/YYYY")}</div>
          </div>
          <div className="home-section-quote">
            <div className="home-section-title">Quote of the Day</div>
            <div className="home-section-content">
              An apple a day keeps the doctor away!
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="home-section-title">Tasks</div>
          <div className="home-section-content">
            { this.getContentLinks() }
          </div>
        </div>
        {/* <div className="col-3">
          <div className="home-section-title">Profile</div>
          <div className="home-section-progress">
            <Link to="/tasks">
              <img alt="Tasks" className="home-section-progress-image" src={envelopeWithMedal}/>
            </Link>
          </div>
        </div> */}
      </div>
    );
  }
}

// Small wrapper around ShadowButton for home page content items.
class ContentItemLink extends Component {
  render() {
    const { classLevel, num, taskId, title, type } = this.props;
    const link = (type === c.TYPE_TASK ? `/task/${taskId}` : `/materials/${type}/${classLevel}/${num}`);
    return (
      <ShadowButton className="home-next-activity" to={link}>
        <div className="shadow-button-text home-next-activity-category">{s[type]}</div>
        <div className="home-next-activity-details">{title}</div>
      </ShadowButton>
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
