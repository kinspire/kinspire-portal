import moment from "moment";
import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";

// import ShadowButton from "../components/ShadowButton";
// import { contentConstants as c, contentStrings as s } from "../constants";
// import tasksService from "../services/tasksService";

import "./Home.css";

// The home page
export default class Home extends Component {
  public getContentLinks() {
    // TODO actually return links to content
    return [];
  }

  public render() {
    return (
      <Container>
        <Row className="portal-body">
          <Col xs={3}>
            <div className="home-section-date">
              <div className="home-section-title">Today&#39;s date</div>
              <div className="home-section-content">{moment().format("ddd DD/MM/YYYY")}</div>
            </div>
            <div className="home-section-quote">
              {/* <div className="home-section-title">Quote of the Day</div>
            <div className="home-section-content">
              An apple a day keeps the doctor away!
            </div> */}
            </div>
          </Col>
          <Col xs={6}>
            <div className="home-section-title">More content coming soon!</div>
            {/*
          <div className="home-section-title">Progress Bar!</div>
          <Progress percent={44} progress>Label</Progress>
          <div className="home-section-content">
            { this.getContentLinks() }
            You're almost there!
          </div>
          */}
          </Col>
          {/* <div className="col-3">
          <div className="home-section-title">Profile</div>
          <div className="home-section-progress">
            <Link to="/tasks">
              <img alt="Tasks" className="home-section-progress-image" src={envelopeWithMedal}/>
            </Link>
          </div>
        </div> */}
        </Row>
      </Container>
    );
  }
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
