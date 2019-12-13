import { Grid } from "@material-ui/core";
import _ from "lodash";
import log from "loglevel";
import React from "react";
import { RouteComponentProps } from "react-router";
import swal from "sweetalert";

import "./Story.css";

import Scaffold from "../components/Scaffold";
import { ContentType, View } from "../constants";
import { Answer, McqQuestion, service, Story } from "../content";

interface Params {
  classLevel: string;
  num: string;
}

interface Props extends RouteComponentProps<Params> {}

interface State {
  answers: Answer[];
  content?: Story; // TODO
  correct_answers: any[]; // TODO
}

class StoryPage extends React.Component<Props, State> {
  public state = {
    answers: [],
    correct_answers: [],
  } as State;

  // Load story and any progress the user might have had for this story
  public async componentDidMount() {
    const { classLevel, num } = this.props.match.params;
    try {
      const values = await Promise.all([
        service.getContent(ContentType.STORY, +classLevel, +num),
        service.getContentProgress(ContentType.STORY, +classLevel, +num),
      ]);
      const story = values[0] as Story;
      this.setState({
        content: story,
        // If there are no answers, then set up default answers
        answers: _.get(
          values[1],
          "answers",
          story.questions.map(q => (q.type === "mcq" ? -1 : ""))
        ),
        correct_answers: story.questions.map(q =>
          q.type === "mcq" ? (q as McqQuestion).correctChoice : ""
        ),
      });
    } catch (err) {
      swal(`${err}`);
    }
  }

  // [1 of 2] Handle answer changes
  public handleOptionChange = (i: number, event: any) => {
    const answers = this.state.answers;
    answers[i] = parseInt(event.target.value, 10);
    this.setState({ answers });
  };

  // [2 of 2] Handle answer changes
  public handleInputChange = (i: number, event: any) => {
    const answers = this.state.answers;
    answers[i] = event.target.value;
    this.setState({ answers });
  };

  // Submit the answers
  public handleSubmit = () => {
    const { answers } = this.state;
    const { correct_answers } = this.state;
    service
      .submitContentProgress({
        type: ContentType.STORY,
        classLevel: +this.props.match.params.classLevel,
        num: +this.props.match.params.num,
        answers,
      })
      .then(() => {
        let res = "";
        for (let i = 0; i < answers.length; i++) {
          if (correct_answers[i] !== "") {
            if (answers[i] === correct_answers[i]) {
              res += `Question ${i + 1} is correct!\n`;
            } else {
              res += `Question ${i + 1} is incorrect.\n`;
            }
          }
          swal(res);
        }
      })
      .catch(err => swal("Error: " + err));
  };

  // Generates the HTML for the story based on the given JSON blob
  public generateStory = () => {
    if (!this.state.content) {
      return "";
    }
    const { content } = this.state;

    const paragraphs = content.story;
    const vocab = content.vocab || [];
    // TODO: Implement more generalized translations
    // const language = JSON.parse(localStorage.getItem("user") || "").preferredLanguage;
    // if (language === "telugu") {
    const translations = content["translation-te"]; // content["translation-ma"];

    let i = 0;

    // Convert the paragraphs array
    return paragraphs.map((paragraph, paragraphNum) => {
      const paragraphContent = [];

      while (i < vocab.length) {
        // Split the paragraph on the vocab word, so that we get just the
        // paragraph up to but not including the vocab word
        const parts = paragraph.split(vocab[i]);
        paragraphContent.push(
          <span key={`pre-vocab-${i}`} className="stories-story-text">
            {parts[0]}
          </span>
        );

        // Fencepost for if the vocab word is not in the paragraph
        if (parts.length < 2) {
          break;
        }

        // Write out the vocab word
        const vocabWord = (
          <span className="stories-vocab" key={vocab[i]}>
            <span className="stories-vocab-word">{vocab[i]}</span>
            <div className="stories-vocab-def">
              {i < translations.length ? translations[i] : "[translation]"}
            </div>
          </span>
        );

        paragraphContent.push(vocabWord);

        paragraph = _.join(parts.slice(1), vocab[i]);
        i++;
      }

      if (i === vocab.length) {
        // sanity check
        // Fencepost for last word
        paragraphContent.push(
          <span className="stories-story-text" key={`pre-vocab-${i}`}>
            {paragraph}
          </span>
        );
      }

      return (
        <div className="stories-story-paragraph" key={`para-${paragraphNum}`}>
          {paragraphContent}
        </div>
      );
    });
  };

  // Generate the questions HTML based on state
  public generateQuestions = () => {
    if (!this.state.content) {
      return "";
    }

    const questions = this.state.content.questions;

    // Iterate through the questions and create JSX in `output`
    const output: any[] = [];
    questions.forEach((question, i) => {
      output.push(<li key={`question-${i}`}>{question.question}</li>);

      switch (question.type) {
        case "mcq":
          (question as McqQuestion).choices.forEach((choice, j) => {
            output.push(
              <div className="radio" key={`question-${i}-answer-${j}`}>
                <label>
                  <input
                    type="radio"
                    name={`question-${i}`}
                    id={`question-${i}`}
                    value={j}
                    checked={this.state.answers[i] === j}
                    onChange={this.handleOptionChange.bind(this, i)}
                  />
                  {choice}
                </label>
              </div>
            );
          });
          break;
        case "short":
          output.push(
            <input
              type="text"
              key={`question-${i}-answer`}
              name={`question-${i}`}
              id={`question-${i}`}
              value={this.state.answers[i]}
              onChange={this.handleInputChange.bind(this, i)}
            />
          );
          break;
        case "long":
          output.push(
            <textarea
              key={`question-${i}-answer`}
              name={`question-${i}`}
              id={`question-${i}`}
              value={this.state.answers[i]}
              onChange={this.handleInputChange.bind(this, i)}
            />
          );
          break;
        default:
          log.warn(`Unknown question type: ${question.type}`);
          break;
      }
    });

    return output;
  };

  public render() {
    return (
      <Scaffold view={View.STORY}>
        <div className="stories-container">
          <Grid container>
            <Grid item xs={12}>
              <h1 className="stories-story-title">{_.get(this.state.content, "title")}</h1>
            </Grid>
          </Grid>
          <Grid container className="stories-story" spacing={1}>
            <Grid item xs={6}>
              <div className="stories-story-section-story">{this.generateStory()}</div>
            </Grid>
            <Grid item xs={6}>
              <div className="stories-story-section stories-story-section-questions">
                <div className="stories-story-section-questions-title">Questions</div>
                <ol type="1">{this.generateQuestions()}</ol>
                <div className="submit-questions">
                  <input
                    className="login-button"
                    type="button"
                    value="Submit"
                    onClick={this.handleSubmit}
                  />
                </div>
                <div id="error" />
              </div>
            </Grid>
          </Grid>
        </div>
      </Scaffold>
    );
  }
}

export default StoryPage;
