// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Home.css';
import SyncButton from '../components/SyncButton';
import ActivityLink from '../components/ActivityLink';
import envelopeWithMedal from '../images/home-page-envelope-with-medal.png';
import { activityConstants } from '../constants';

export default class Home extends Component {
  /**
  * Returns a list of links that link to the next activity for the logged-in
  * student.
  */
  getActivities() {
    // First retrieve the next story to try
    let nextStory = (
      <ActivityLink type={activityConstants.STORY} num={0}/>
    );
    // return "Content coming!";
    return nextStory;
  }

  render() {
    return (
      <div className="portal-body row">
        <div className="col-3">
          <div className="home-section-date">
            <div className="home-section-title">Today's date</div>
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
          <div className="home-section-title">Next Activity to Try</div>
          <div className="home-section-content">
            { this.getActivities() }
          </div>
        </div>
        <div className="col-3">
          <div className="home-section-title">Your Progress</div>
          <div className="home-section-progress">
            <Link to="/achievements">
              <img alt="Progress" className="home-section-progress-image" src={envelopeWithMedal}/>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

// <div className="home-avatars">
//   <img className="home-avatar" src="/images/avatar/<?php echo $user['avatar'];?>.svg"/>
// </div>
