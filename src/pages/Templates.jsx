import React, { Component } from "react";
import PropTypes from "prop-types";
import swal from "sweetalert";


import { contentConstants as c } from "../constants";
import contentService from "../services/contentService";

class Templates extends Component {
  constructor(props) {
    super(props);

    this.state = {
      answers: [],
      content: null,
    };

    this.handleOptionChange     = this.handleOptionChange.bind(this);
    this.handleInputChange      = this.handleInputChange.bind(this);
    this.handleSubmit           = this.handleSubmit.bind(this);
  }

  // Load story and any progress the user might have had for this story
  componentDidMount() {
    const { classLevel, num } = this.props.match.params;
    Promise.all([
      contentService.getContent(c.TYPE_STORY, classLevel, num),
      contentService.getContentProgress(c.TYPE_STORY, classLevel, num),
    ])
      .then(values => {
        console.log(values);
        this.setState({
          content: values[0],
          answers: values[1].answers ||
            // If there are no answers, then set up default answers
            values[0].questions.map((q) => q.type === "mcq" ? -1 : ""),
        });
      })
      .catch(err => swal(`Error: ${err}`));
  }

  // [1 of 2] Handle answer changes
  handleOptionChange(i, event) {
    const answers = this.state.answers;
    answers[i] = parseInt(event.target.value, 10);
    this.setState({answers});
  }

  // [2 of 2] Handle answer changes
  handleInputChange(i, event) {
    const answers = this.state.answers;
    answers[i] = event.target.value;
    this.setState({answers});
  }

  // Submit the answers
  handleSubmit() {
    contentService.submitContentProgress(c.TYPE_STORY, this.props.match.params.classLevel,
      this.props.match.params.num, this.state.answers)
      .then(() => swal("submitted!"))
      .catch(err => swal(err));
  }

  // Generates the HTML for the story based on the given JSON blob
  generateStory() {
    if (!this.state.content) return "";
    const { content } = this.state;

    const paragraphs = content.story;
    const vocab = content.vocab || [];
    // TODO: Implement more generalized translations
    const translations = content["translation-te"];
    let i = 0;

    // Convert the paragraphs array
    return paragraphs.map((paragraph, paragraphNum) => {
      const paragraphContent = [];

      while (i < vocab.length) {
        // Split the paragraph on the vocab word, so that we get just the
        // paragraph up to but not including the vocab word
        const parts = paragraph.split(vocab[i], 2);
        paragraphContent.push(
          <span key={`pre-vocab-${i}`} className="stories-story-text">{parts[0]}</span>
        );

        // Fencepost for if the vocab word is not in the paragraph
        if (parts.length < 2) break;

        // Write out the vocab word
        const vocabWord = (
          <span className="stories-vocab" key={vocab[i]}>
            <span className="stories-vocab-word">{vocab[i]}</span>
            <div className="stories-vocab-def">
              {(i < translations.length) ? translations[i] : "[translation]"}
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
        );
      }

      return (
        <div className="stories-story-paragraph" key={`para-${paragraphNum}`}>
          {paragraphContent}
        </div>
      );
    });
  }

  // Generate the questions HTML based on state
  generateQuestions() {
    if (!this.state.content) return "";

    const questions = this.state.content.questions;

    // Iterate through the questions and create JSX in `output`
    const output = [];
    questions.forEach((question, i) => {
      output.push(<li key={`question-${i}`}>{question.question}</li>);

      switch (question.type) {
      case "mcq":
        question.choices.forEach((choice, j) => {
          output.push(
            <div className="radio" key={`question-${i}-answer-${j}`}>
              <label>
                <input
                  type="radio" name={`question-${i}`} id={`question-${i}`}
                  value={j}
                  checked={this.state.answers[i] === j}
                  onChange={this.handleOptionChange.bind(this, i)}/>
                {choice}
              </label>
            </div>
          );
        });
        break;
      case "short":
        output.push(
          <input
            type="text" key={`question-${i}-answer`} name={`question-${i}`}
            id={`question-${i}`} value={this.state.answers[i]}
            onChange={this.handleInputChange.bind(this, i)} />
        );
        break;
      case "long":
        output.push(
          <textarea
            key={`question-${i}-answer`} name={`question-${i}`}
            id={`question-${i}`} value={this.state.answers[i]}
            onChange={this.handleInputChange.bind(this, i)} />
        );
        break;
      default:
        console.log(`Unknown question type: ${question.type}`);
        break;
      }
    });

    return output;
  }

  render() {
    return (
      <div className="stories-story">
        <div className="stories-story-section stories-story-section-story">
          {this.generateStory()}
        </div>
        <div className="stories-story-divider"></div>
        <div className="stories-story-section stories-story-section-questions">
          <div className="stories-story-section-questions-title">Questions</div>
          <ol type="1">
            {this.generateQuestions()}
          </ol>
          <input type="button" value="Submit!" onClick={this.handleSubmit}/>
          <div id="error"></div>
        </div>
      </div>
    );
  }
}

Templates.propTypes = {
  match: PropTypes.object.isRequired
};

export default Templates;
