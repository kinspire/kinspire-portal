import { fullUnescape } from "@app/util";
import { ContentArg } from "@common/messages";
import { Answer, McqQuestion, Module, QuestionType, StoryModule } from "@common/schema";
import { FormControlLabel, Grid, Radio, RadioGroup, Typography } from "@material-ui/core";
import { forEach, get, join, map, set, size, unescape } from "lodash";
import React from "react";
import swal from "sweetalert";
import { getColor, View } from "../constants";
import { callElectronContent } from "../services/electron";
import "./Story.css";

interface Props {
  course: string;
  section: string;
  module: string;
  // State propagated to parent
  answers: Answer[];
  setAnswers: (a: Answer[]) => void;
}

interface State {
  module?: StoryModule;
  // answers: Answer[];
  // correct_answers: any[]; // TODO
}

class StoryPage extends React.Component<Props, State> {
  public state = {} as State;

  // Load story and any progress the user might have had for this story
  public async componentDidMount() {
    try {
      const module = (await callElectronContent(ContentArg.GET_MODULE, this.props)) as StoryModule;

      this.setState({
        module,
      });

      // TODO: If there are no answers, then set up default answers
      const answers = map(get(module.content, "answers", []), (a: Answer) => {
        return {
          ...a,
          answer: fullUnescape(a.answer),
        };
      });

      // Propagate existing answers up to parent component
      this.props.setAnswers(answers);
    } catch (err) {
      swal(`${err}`);
    }
  }

  // [1 of 2] Handle answer changes
  public handleOptionChange = (i: number, event: any) => {
    const answers = [...this.props.answers];
    set(answers[i], "answer", parseInt(event.target.value, 10));
    this.props.setAnswers(answers);
  };

  // [2 of 2] Handle answer changes
  public handleInputChange = (i: number, event: any) => {
    const answers = [...this.props.answers];
    set(answers[i], "answer", event.target.value);
    this.props.setAnswers(answers);
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

  // Generates the HTML for the story based on the given JSON blob
  public generateStory = () => {
    if (!this.state.module || !this.state.module.content) {
      return "";
    }
    const {
      module: { content },
    } = this.state;

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
        case QuestionType.MCQ:
          const choices = (question as McqQuestion).choices.map((choice, j) => (
            <FormControlLabel key={j} value={j} control={<Radio />} label={choice} />
          ));
          output.push(
            <RadioGroup
              name={`question-${i}`}
              key={i}
              value={get(this.props.answers, `[${i}].answer`, "")}
              onChange={this.handleOptionChange.bind(null, i)}
            >
              {choices}
            </RadioGroup>
          );
          break;
        case QuestionType.SHORT:
          output.push(
            <input
              type="text"
              key={`question-${i}-answer`}
              name={`question-${i}`}
              id={`question-${i}`}
              value={get(this.props.answers, `[${i}].answer`, "")}
              onChange={this.handleInputChange.bind(this, i)}
            />
          );
          break;
        case QuestionType.LONG:
          output.push(
            <textarea
              key={`question-${i}-answer`}
              name={`question-${i}`}
              id={`question-${i}`}
              value={get(this.props.answers, `[${i}].answer`, "")}
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
          <Grid item xs={6}>
            <div className="stories-story-section-story">
              <Typography variant="h5" style={{ color: getColor(View.COURSES) }}>
                STORY
              </Typography>
              <div>{this.generateStory()}</div>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className="stories-story-section stories-story-section-questions">
              <Typography variant="h5" style={{ color: getColor(View.COURSES) }}>
                QUESTIONS
              </Typography>
              <ol style={{ display: "block" }} type="1">
                {this.generateQuestions()}
              </ol>
              <div id="error" />
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default StoryPage;
