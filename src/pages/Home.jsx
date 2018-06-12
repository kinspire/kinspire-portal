// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './Home.css';
import ActivityLink from '../components/ActivityLink';
import envelopeWithMedal from '../images/home-page-envelope-with-medal.png';
import { activityConstants } from '../constants';
import { activityActions } from '../actions/activityActions';

class Home extends Component {
  constructor(props) {
    super(props);

    this.props.dispatch(activityActions.getNextActivities());

    this.state = {};
  }

  /**
  * Returns a list of links that link to the next activity for the logged-in
  * student.
  */
  getActivities() {
    // Convert the props `nextActivities` into ActivityLinks
    if (this.props.nextActivities) {
      return this.props.nextActivities.map((a) => (
        <ActivityLink {...a}/>
      ));
    }
    return "";
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
            { this.getActivities(this.props.nextActivities) }
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

function mapStateToProps(state) {
  const { nextActivities } = state.activity;
  return {
    nextActivities
  };
}
export default connect(mapStateToProps)(Home);
