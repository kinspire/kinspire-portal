// @flow
import React, { Component } from 'react';

import { generateStory } from '../utils/stories.js';

import './Story.css';

export default class Story extends Component {
  propTypes: {
    match: PropTypes.object.isRequired
  };

  // <?php
  // require $_SERVER['DOCUMENT_ROOT'].'/content/stories/'.$_GET['level'].'/story-'.$_GET['id'].'.html';
  // ?>

  // <?php require $_SERVER['DOCUMENT_ROOT'].'/content/stories/'.$_GET['level'].'/questions-'.$_GET['id'].'.html';?>

  render() {
    return (
      <div class="stories-story">
        <div class="stories-story-section stories-story-section-story">
          {generateStory(this.props.match.params.storyNumber)}
        </div>
        <div class="stories-story-divider"></div>
        <div class="stories-story-section stories-story-section-questions">
          <div class="stories-story-section-questions-title">Questions</div>
          <form method="post" name="story-answers">
            <ol type="1">
            </ol>
            <input type="button" value="Submit!" id="submit-answers" />
            <div id="error"></div>
          </form>
        </div>
      </div>
    );
  }
};
