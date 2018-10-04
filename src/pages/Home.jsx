// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './Home.css';
import ContentItemLink from '../components/ContentItemLink';
import envelopeWithMedal from '../images/home-page-envelope-with-medal.png';
import { tasksActions } from '../actions/tasksActions';

class Home extends Component {
  constructor(props) {
    super(props);

    // TODO replace with dispatching tasks instead
    // this.props.dispatch(contentActions.getNextContentItems());
    this.props.dispatch(tasksActions.getTasks());

    this.state = {};
  }

  /**
  * Returns a list of links that link to the next content for the logged-in
  * student.
  */
  getContentItems() {
    // Convert the props `nextContentItems` into ContentItemLinks
    if (this.props.nextContentItems) {
      return this.props.nextContentItems.map((a, i) => (
        <ContentItemLink key={i} {...a}/>
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
          <div className="home-section-title">Next Content Item to Try</div>
          <div className="home-section-content">
            { this.getContentItems(this.props.nextContentItems) }
          </div>
        </div>
        <div className="col-3">
          <div className="home-section-title">Your Tasks</div>
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

Home.propTypes = {
  dispatch: PropTypes.func,
};

// <div className="home-avatars">
//   <img className="home-avatar" src="/images/avatar/<?php echo $user['avatar'];?>.svg"/>
// </div>

function mapStoreToProps(state) {
  const { nextContentItems } = state.content;
  return {
    nextContentItems
  };
}
export default connect(mapStoreToProps)(Home);
