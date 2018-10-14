// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Home.css';
// import ContentItemLink from '../components/ContentItemLink';
import envelopeWithMedal from '../images/home-page-envelope-with-medal.png';
import { tasksService } from '../services/tasksService';

class Home extends Component {
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

  render() {
    return (
      <div className="portal-body row">
        <div className="col-3">
          <div className="home-section-date">
            <div className="home-section-title">Today&#39;s date</div>
            <div className="home-section-content">{new Date().toDateString()}</div>
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
            { JSON.stringify(this.state.tasks) }
          </div>
        </div>
        <div className="col-3">
          <div className="home-section-title">Progress</div>
          <div className="home-section-progress">
            <Link to="/tasks">
              <img alt="Tasks" className="home-section-progress-image" src={envelopeWithMedal}/>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
