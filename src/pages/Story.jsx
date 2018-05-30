// @flow
import React, { Component } from 'react';

import './Story.css';

// TODO hmm optimize when to load file

function generateStory(classLevel, storyNumber) {
  let storyJson = require(`../content/stories/${classLevel}/${storyNumber}.json`);

  let paragraphs = storyJson.story;
  let vocab = storyJson.vocab;
  let translations = storyJson['translation-te'];
  let i = 0;

  return paragraphs.map((paragraph) => {
    let paragraphContent = [];

    while (i < vocab.length) {
      // Split the paragraph on the vocab word, so that we get just the
      // paragraph up to but not including the vocab word
      let parts = paragraph.split(vocab[i], 2);
      paragraphContent.push(
        <span className="stories-story-text">{parts[0]}</span>
      );

      // Fencepost for if the vocab word is not in the paragraph
      if (parts.length < 2) break;

      // Write out the vocab word
			let vocabWord = (
				<span className="stories-vocab">
					<span className="stories-vocab-word">{vocab[i]}</span>
					<div className="stories-vocab-def">
						{(i < translations.length) ? translations[i] : '[translation]'}
					</div>
				</span>
			);

      paragraphContent.push(vocabWord);

      i++;
      paragraph = parts[1];
    }

    if (i === vocab.length) { // sanity check
      // Fencepost for last word
      paragraphContent.push(
        <span className="stories-story-text">{paragraph}</span>
      )
    }

    return (
      <div className="stories-story-paragraph">
        {paragraphContent}
      </div>
    );
  });
}

function generateQuestions(classLevel, storyNumber) {
  let storyJson = require(`../content/stories/${classLevel}/${storyNumber}.json`);

  let questions = storyJson.questions;

  let output = [];
  questions.forEach((question) => {
    output.push(<li>{question.question}</li>);

    switch (question.type) {
      case 'mcq':
        question.choices.forEach((choice, j) => {
          output.push(
            <div className="radio">
              <label>
                <input
                  type="radio"
                  name={`question-${question.number}`}
                  id={`question-${question.number}`}
                  value={`question-${question.number}-${j}`} />
                {choice}
              </label>
            </div>
          );
        });
        break;
      case 'short':
        output.push(
          <input
            type="text"
            name={`question-${question.number}`}
            id={`question-${question.number}`} />
        )
        break;
      case 'long':
        output.push(
          <textarea
            name={`question-${question.number}`}
            id={`question-${question.number}`}>
          </textarea>
        )
        break;
      default:
        break;
    }
  });

  return output;
}

export default class Story extends Component {
  propTypes: {
    match: PropTypes.object.isRequired
  };

  // TODO move the generation into getDerivedStateFromProps, so we only
  // regenerate on actual content changes
  // TODO or maybe not...?

  render() {
    const { classLevel, storyNumber } = this.props.match.params;

    return (
      <div class="stories-story">
        <div class="stories-story-section stories-story-section-story">
          {generateStory(classLevel, storyNumber)}
        </div>
        <div class="stories-story-divider"></div>
        <div class="stories-story-section stories-story-section-questions">
          <div class="stories-story-section-questions-title">Questions</div>
          <ol type="1">
            {generateQuestions(classLevel, storyNumber)}
          </ol>
          <input type="button" value="Submit!" id="submit-answers" />
          <div id="error"></div>
        </div>
      </div>
    );
  }
};
