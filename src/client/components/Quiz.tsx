import { ContentArg } from "@common/messages";
import { Answer, Module, McqQuestion, Story } from "@common/schema";
import { Button, FormControlLabel, Grid, Radio, RadioGroup, Typography } from "@material-ui/core";
import { forEach, get, join, map, size } from "lodash";
import React from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { View, getColor } from "../constants";
import { callElectron } from "../services/content";
import "./Story.css";

interface Props {
  course: string;
  section: string;
  module: string;
}

interface State {
  answers: Answer[];
  module?: Module;
  correct_answers: any[]; // TODO
}

class QuizPage extends React.Component<Props, State> {
  public state = {
    answers: [],
    correct_answers: [],
  } as State;

  // Load story and any progress the user might have had for this story
  public async componentDidMount() {
    try {
      const module = (await callElectron(ContentArg.GET_MODULE, this.props)) as Module;

      this.setState({
        module: module,
        // If there are no answers, then set up default answers
        answers: map(get(module.content, "questions"), (q) => (q.type === "mcq" ? -1 : "")),
        correct_answers: map(get(module.content, "questions"), (q) =>
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
  public handleSubmit = async () => {
    try {
      /*
      await getContent(ContentArg.SUBMIT_CONTENT_PROGRESS, {
        type: ContentType.STORY,
        classLevel: +this.props.match.params.classLevel,
        num: +this.props.match.params.num,
        answers,
      } as ContentProgress);

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
      */
    } catch (err) {
      swal("Error: " + err);
    }
  };

  // Generate the questions HTML based on state
  public generateQuestions = () => {
    if (!this.state.module || !this.state.module.content) {
      return "";
    }

    const questions = this.state.module.content.questions;

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
          console.warn(`Unknown question type: ${question.type}`);
          break;
      }
    });

    return output;
  };

  public render() {
    return (
      <div className="story-container">
        <Grid container justify="center" alignItems="center" spacing={1}>
          <Grid item xs={12}>
            <Typography variant="h4" style={{ color: getColor(View.COURSES) }}>
              {get(this.state.module, "title")}
            </Typography>
          </Grid>
        </Grid>
        <Grid container className="stories-story" spacing={1}>
          <div className="stories-story-section stories-story-section-questions">
            <Typography variant="h5" style={{ color: getColor(View.COURSES) }}>
              HOMEWORK QUESTIONS
            </Typography>
            <ol style={{ display: "block" }} type="1">
              {this.generateQuestions()}
            </ol>
            <div id="error" />
          </div>
        </Grid>
      </div>
    );
  }
}

export default QuizPage;
