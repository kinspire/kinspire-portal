// @flow
import React, { Component } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import swal from "sweetalert";

import ShadowButton from "../components/ShadowButton";
// import HashSet from "../utils/hashset";
import { contentConstants as c } from "../constants";
import { contentService } from "../services/contentService";

import "./WordSearch.css";

export default class WordSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      wordStart: {row: -1, col: -1},
      grid: [],
      words: [],
      chosenWords: {},
      chosenCells: {},
    };

    this.handleLetterClicked          = this.handleLetterClicked.bind(this);
    this.handleSave                   = this.handleSave.bind(this);
  }

  componentDidMount() {
    // TODO: highlight the initial words
    const { classLevel, num } = this.props.match.params;
    // TODO optimize when to load file
    // const wsJson = require(`../content/wordsearch/${classLevel}/${storyNumber}.json`);
    Promise.all([
      contentService.getContent(c.TYPE_WORD_SEARCH, classLevel, num),
      contentService.getContentProgress(c.TYPE_STORY, classLevel, num),
    ])
      .then(values => {
        const [ content, progress ] = values;

        // Set up state
        this.setState({
          grid: content.grid,
          words: content.words,
          ...progress,
        });
      });
  }

  /**
  * Returns a string representing the word chosen from wordStart to
  * wordEnd.
  */
  getSelectedWord(wordEnd) {
    const { wordStart, grid } = this.state;
    const wordDelta = [wordEnd[0] - wordStart[0], wordEnd[1] - wordStart[1]];
    if ((wordDelta[0] === 0 && wordDelta[1] === 0) || (Math.abs(wordDelta[0]) !== Math.abs(wordDelta[1]) && wordDelta[0] !== 0 && wordDelta[1] !== 0)) {
      return null;
    }
    // We have a word!
    const wordLen = Math.max.apply(null, wordDelta.map(Math.abs));
    let word = "";
    for (let i = 0; i <= wordLen; i++) {
      const row = wordStart[0] + i * (wordDelta[0] / wordLen);
      const col = wordStart[1] + i * (wordDelta[1] / wordLen);
      word += grid[row][col];
    }
    return word;
  }

  handleLetterClicked(row, col) {
    if (this.state.wordStart[0] >= 0) {
      // This is the case that one letter has been clicked and we are selecting the word end
      const wordEnd = [row, col];
      const selectedWord = this.getSelectedWord(wordEnd);
      if (!selectedWord) {
        swal("Choose a word! Resetting choice.");
      } else if (selectedWord in this.state.chosenWords) {
        swal("Word already chosen! Resetting choice.");
      } else {
        if (this.state.words.includes(selectedWord)) {
          swal(`Nice job! You chose: ${  selectedWord}`);
          this.wordIsChosen(wordEnd, selectedWord);
        } else {
          // Check for completion
          if (Object.keys(this.state.chosenWords).length === this.state.words.length) {
            swal("Nice job! Game over :)");
          }
        }
      }
      this.setState({
        wordStart: [-1, -1]
      });
    } else {
      // Start word selection
      this.setState({
        wordStart: [row, col]
      });
    }
  }

  handleSave() {
    const { classLevel, num } = this.props.match.params;
    const { chosenWords, chosenCells } = this.state;

    contentService.submitContent(c.TYPE_WORD_SEARCH, classLevel, num, { chosenWords, chosenCells })
      .then(() => swal("Saved!"))
      .catch(err => swal(`Error: ${err}`));
  }

  wordIsChosen(wordEnd, selectedWord) {
    const { wordStart, chosenWords } = this.state;
    const chosenCells = this.state.chosenCells.copy();
    const wordDel = [wordEnd[0] - wordStart[0], wordEnd[1] - wordStart[1]];
    // Fancy functional programming to get the length of the word
    const wordLen = Math.max.apply(null, wordDel.map(Math.abs));
    for (let i = 0; i <= wordLen; i++) {
      const row = wordStart[0] + i * (wordDel[0] / wordLen);
      const col = wordStart[1] + i * (wordDel[1] / wordLen);
      chosenCells.put([row, col]);
      // getElement([row, col]).addClass('wordsearch-letter-completed');
    }

    this.setState({
      chosenWords: Object.assign(chosenWords, {[selectedWord]: [wordStart, wordEnd]}),
      chosenCells: chosenCells
    });
  }

  generateGrid() {
    return this.state.grid.map((row, rowN) => {
      // TODO add completed to corresponding letters

      const rowJsx = row.split("").map((char, col) => {
        const letterClasses = classNames({
          "wordsearch-letter": true,
          "wordsearch-letter-start": rowN === this.state.wordStart[0] && col === this.state.wordStart[1],
          "wordsearch-letter-completed": this.state.chosenCells.has([rowN, col])
        });

        return (
          <div
            className={letterClasses}
            key={col} onClick={this.handleLetterClicked.bind(this, rowN, col)}>
            {char}
          </div>
        );
      });

      return (
        <div className="wordsearch-row" key={rowN}>
          {rowJsx}
        </div>
      );
    });
  }

  generateWords() {
    // TODO add strikethrough for selected words

    return this.state.words.map((word, i) => (
      <div className={`wordsearch-word${  (word in this.state.chosenWords) ? " strikethrough" : ""}`}
        key={i}>
        {word}
      </div>
    ));
  }

  render() {
    return (
      <div className="portal-body">
        <div className="row">
          <div className="wordsearch-grid-area">
            {this.generateGrid()}
          </div>
          <div className="wordsearch-words">
            {this.generateWords()}
          </div>
        </div>
        <ShadowButton text="Save" onClick={this.handleSave} />
      </div>
    );
  }
}

WordSearch.propTypes = {
  match: PropTypes.object.isRequired
};
