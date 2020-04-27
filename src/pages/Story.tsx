import {
  Box,
  Button,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@material-ui/core";
import { forEach, get, join, map, size } from "lodash";
import log from "loglevel";
import React from "react";
import { RouteComponentProps } from "react-router";
import swal from "sweetalert";

import "./Story.css";

import Scaffold from "../components/Scaffold";
import { ContentType, View } from "../constants";
import { Answer, McqQuestion, service, Story } from "../services/content";

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
      log.debug(story);
      this.setState({
        content: story,
        // If there are no answers, then set up default answers
        answers: get(
          values[1],
          "answers",
          map(get(story, "questions"), (q) => (q.type === "mcq" ? -1 : ""))
        ),
        correct_answers: map(get(story, "questions"), (q) =>
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
      .catch((err) => swal("Error: " + err));
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
    const translations = content["translation-ma"];

    let i = 0;

    // Convert the paragraphs array
    return map(paragraphs, (paragraph, paragraphNum) => {
      const paragraphContent = [];

      while (i < vocab.length) {
        // Split the paragraph on the vocab word, so that we get just the
        // paragraph up to but not including the vocab word
        const parts = paragraph.split(vocab[i]);
        paragraphContent.push(<span key={`pre-vocab-${i}`}>{parts[0]}</span>);

        // Fencepost for if the vocab word is not in the paragraph
        if (parts.length < 2) {
          break;
        }

        // Write out the vocab word
        const vocabWord = (
          <span className="stories-vocab" key={vocab[i]}>
            <span className="stories-vocab-word">{vocab[i]}</span>
            {i < size(translations) ? (
              <span className="stories-vocab-def">{get(translations, `[${i}]`)}</span>
            ) : (
              ""
            )}
          </span>
        );

        paragraphContent.push(vocabWord);

        paragraph = join(parts.slice(1), vocab[i]);
        i++;
      }

      if (i === vocab.length) {
        // sanity check
        // Fencepost for last word
        paragraphContent.push(
          <Typography key={`pre-vocab-${i}`} component="span">
            {paragraph}
          </Typography>
        );
      }

      return (
        <Typography className="stories-story-paragraph" key={`para-${paragraphNum}`}>
          {paragraphContent}
        </Typography>
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
    forEach(questions, (question, i) => {
      output.push(
        <li key={`question-${i}`}>
          <Typography>{question.question}</Typography>
        </li>
      );

      switch (question.type) {
        case "mcq":
          const choices = (question as McqQuestion).choices.map((choice, j) => (
            <FormControlLabel key={j} value={j} control={<Radio />} label={choice} />
          ));
          output.push(
            <RadioGroup
              name={`question-${i}`}
              key={i}
              value={this.state.answers[i]}
              onChange={this.handleOptionChange.bind(null, i)}
            >
              {choices}
            </RadioGroup>
          );
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
          <Grid container justify="center" alignItems="center" spacing={1}>
            <Grid item>
              <Typography className="stories-story-title" variant="h4">
                {get(this.state.content, "title")}
              </Typography>
            </Grid>
            <Grid>
              <Typography>
                <i>
                  ({get(this.state.content, "classLevel")}-{get(this.state.content, "num")})
                </i>
              </Typography>
            </Grid>
          </Grid>
          <Grid container className="stories-story" spacing={1}>
            <Grid item xs={6}>
              <div className="stories-story-section-story">{this.generateStory()}</div>
            </Grid>
            <Grid item xs={6}>
              <div className="stories-story-section stories-story-section-questions">
                <Typography variant="h5" className="stories-story-section-questions-title">
                  <Box fontWeight="fontWeightBold">Questions</Box>
                </Typography>
                <ol type="1">{this.generateQuestions()}</ol>
                <Button variant="contained" onClick={this.handleSubmit}>
                  Submit
                </Button>
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
