// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Story.css';

import { contentActions } from '../actions/contentActions';

// TODO hmm optimize when to load file

function generateStory(story) {
  if (!story) return '';

  let paragraphs = story.story;
  let vocab = story.vocab || [];
  let translations = story['translation-te'];
  let i = 0;

  return paragraphs.map((paragraph, paragraphNum) => {
    let paragraphContent = [];

    while (i < vocab.length) {
      // Split the paragraph on the vocab word, so that we get just the
      // paragraph up to but not including the vocab word
      let parts = paragraph.split(vocab[i], 2);
      paragraphContent.push(
        <span key={`pre-vocab-${i}`} className="stories-story-text">{parts[0]}</span>
      );

      // Fencepost for if the vocab word is not in the paragraph
      if (parts.length < 2) break;

      // Write out the vocab word
			let vocabWord = (
				<span className="stories-vocab" key={vocab[i]}>
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
        <span className="stories-story-text" key={`pre-vocab-${i}`}>{paragraph}</span>
      )
    }

    return (
      <div className="stories-story-paragraph" key={`para-${paragraphNum}`}>
        {paragraphContent}
      </div>
    );
  });
}

function generateQuestions(story) {
  if (!story) return '';

  let questions = story.questions;

  let output = [];
  questions.forEach((question, i) => {
    output.push(<li key={i}>{question.question}</li>);

    switch (question.type) {
      case 'mcq':
        question.choices.forEach((choice, j) => {
          output.push(
            <div className="radio" key={j}>
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
            key={`question-${question.number}`}
            name={`question-${question.number}`}
            id={`question-${question.number}`} />
        )
        break;
      case 'long':
        output.push(
          <textarea
            key={`question-${question.number}`}
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

class Story extends Component {
  propTypes: {
    match: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    const { classLevel, num } = this.props.match.params;
    // TODO constant for story
    this.props.dispatch(contentActions.getContent("story", classLevel, num));

    this.state = {};
  }

  // TODO move the generation into getDerivedStateFromProps, so we only
  // regenerate on actual content changes
  // TODO or maybe not...?

  render() {
    const { classLevel, storyNumber } = this.props.match.params;

    return (
      <div className="stories-story">
        <div className="stories-story-section stories-story-section-story">
          {generateStory(this.props.content)}
        </div>
        <div className="stories-story-divider"></div>
        <div className="stories-story-section stories-story-section-questions">
          <div className="stories-story-section-questions-title">Questions</div>
          <ol type="1">
            {generateQuestions(this.props.content)}
          </ol>
          <input type="button" value="Submit!" id="submit-answers" />
          <div id="error"></div>
        </div>
      </div>
    );
  }
};

function mapStateToProps(state) {
  const { content } = state.content;
  return { content };
}
export default connect(mapStateToProps)(Story);
