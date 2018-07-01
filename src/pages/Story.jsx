// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Story.css';

import { contentActions } from '../actions/contentActions';
import { contentConstants as c } from '../constants';

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

class Story extends Component {
  propTypes: {
    match: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    const { classLevel, num } = this.props.match.params;
    this.props.dispatch(contentActions.getContent(c.TYPE_STORY, classLevel, num));

    this.state = {};
  }

  handleOptionChange = (i, event) => {
    let answers = this.state.answers;
    answers[i] = parseInt(event.target.value, 10);
    this.setState({answers});
  }

  handleInputChange = (i, event) => {
    let answers = this.state.answers;
    answers[i] = event.target.value;
    this.setState({answers});
  }

  generateQuestions = () => {
    if (!this.props.content) return '';

    let questions = this.props.content.questions;
    let answers = this.state.answers;

    let output = [];

    // TODO use question number or index?
    questions.forEach((question, i) => {
      output.push(<li key={`question-${i}`}>{question.question}</li>);

      switch (question.type) {
      case 'mcq':
        question.choices.forEach((choice, j) => {
          output.push(
            <div className="radio" key={`question-${i}-answer-${j}`}>
              <label>
                <input
                  type="radio" name={`question-${i}`} id={`question-${i}`}
                  value={j}
                  checked={this.state.answers[i] === j}
                  onChange={this.handleOptionChange.bind(null, i)}/>
                {choice}
              </label>
            </div>
          );
        });
        break;
      case 'short':
        output.push(
          <input
            type="text" key={`question-${i}-answer`} name={`question-${i}`}
            id={`question-${i}`} value={this.state.answers[i]}
            onChange={this.handleInputChange.bind(null, i)} />
        )
        break;
      case 'long':
        output.push(
          <textarea
            key={`question-${i}-answer`}
            name={`question-${i}`}
            id={`question-${i}`}
            value={this.state.answers[i]} />
        )
        break;
        default:
        console.log("Unknown question type: " + question.type);
        break;
      }
    });

    return output;
  }

  handleSubmit = (event) => {
    // TODO alas! form validation!
    const { classLevel, num } = this.props.match.params;
    this.props.dispatch(contentActions.submitContent(c.TYPE_STORY, classLevel, num, this.state.answers));
  }

  // TODO move the generation into getDerivedStateFromProps, so we only
  // regenerate on actual content changes
  // TODO or maybe not...?
  static getDerivedStateFromProps(props, state) {
    // Okay so we receive the content from the props, convert it into a state object,
    // and have to correspondingly tie the values to the form elements
    if (props.content) {
      return {
        answers: props.content.questions.map((q, i) => (q.type === 'mcq' ? -1 : ""))
      };
    } else {
      return {
        answers: []
      };
    }
  }

  render() {
    if (this.props.submittedContent) {
      alert("Submitted!");
    }

    return (
      <div className="stories-story">
        <div className="stories-story-section stories-story-section-story">
          {generateStory(this.props.content)}
        </div>
        <div className="stories-story-divider"></div>
        <div className="stories-story-section stories-story-section-questions">
          <div className="stories-story-section-questions-title">Questions</div>
          <ol type="1">
            {this.generateQuestions(this.props.content)}
          </ol>
          <input type="button" value="Submit!" onClick={this.handleSubmit}/>
          <div id="error"></div>
        </div>
      </div>
    );
  }
};

function mapStoreToProps(state) {
  const { content, submittedContent } = state.content;
  return { content, submittedContent };
}
export default connect(mapStoreToProps)(Story);
