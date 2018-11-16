// @flow
import React, { Component } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import swal from "sweetalert";
import _ from "lodash";

import ShadowButton from "../components/ShadowButton";
import HashSet from "../utils/hashset";
import { contentConstants as c } from "../constants";
import { contentService } from "../services/contentService";

import "./WordSearch.css";

// Represents no letter being selected
const NO_LETTER = {row: -1, col: -1};

export default class WordSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      wordStart: NO_LETTER,
      grid: [],
      words: [],
      chosenWords: {}, // map of word to [word Start, word End]
      chosenCells: new HashSet(),
    };

    this.handleLetterClicked          = this.handleLetterClicked.bind(this);
    this.handleSave                   = this.handleSave.bind(this);
  }

  componentDidMount() {
    const { classLevel, num } = this.props.match.params;

    Promise.all([
      contentService.getContent(c.TYPE_WORD_SEARCH, classLevel, num),
      contentService.getContentProgress(c.TYPE_WORD_SEARCH, classLevel, num),
    ])
      .then(values => {
        const [ content, progress ] = values;

        const state = { grid: content.grid, words: content.words };

        if (!_.isEmpty(progress)) {
          const chosenCells = new HashSet();

          // TODO convert chosenWords to chosenCells
          _.forOwn(progress.chosenWords, (startEnd) => {
            const [ wordStart, wordEnd ] = startEnd;
            const wordDel = { row: wordEnd.row - wordStart.row, col: wordEnd.col - wordStart.col };

            // Fancy functional programming to get the length of the word
            const wordLen = Math.max.apply(null, _.values(wordDel).map(Math.abs));

            for (let i = 0; i <= wordLen; i++) {
              const row = wordStart.row + i * (wordDel.row / wordLen);
              const col = wordStart.col + i * (wordDel.col / wordLen);
              chosenCells.put({row, col});
            }
          });

          state.chosenWords = progress.chosenWords;
          state.chosenCells = chosenCells;
        }

        // Set up state
        this.setState(state);
      });
  }

  /**
  * Returns a string representing the word chosen from this.state.wordStart to
  * wordEnd.
  */
  getSelectedWord(wordEnd) {
    const { wordStart, grid } = this.state;

    const wordDelta = {row: wordEnd.row - wordStart.row, col: wordEnd.col - wordStart.col};
    // Has to be a valid diagonal/horizontal/vertical
    if ((wordDelta.row === 0 && wordDelta.col === 0) ||
        (Math.abs(wordDelta.row) !== Math.abs(wordDelta.col) && wordDelta.row !== 0 && wordDelta.col !== 0)) {
      return null;
    }
    // We have a word!
    const wordLen = Math.max.apply(null, _.values(wordDelta).map(Math.abs));
    let word = "";
    for (let i = 0; i <= wordLen; i++) {
      const row = wordStart.row + i * (wordDelta.row / wordLen);
      const col = wordStart.col + i * (wordDelta.col / wordLen);
      word += grid[row][col];
    }
    return word;
  }

  handleLetterClicked(row, col) {
    if (this.state.wordStart.row >= 0) {
      // This is the case that one letter has been clicked and we are selecting the word end
      const wordEnd = {row, col};
      const selectedWord = this.getSelectedWord(wordEnd);
      if (!selectedWord) {
        swal("Choose a word! Resetting choice.");
      } else if (selectedWord in this.state.chosenWords) {
        swal("Word already chosen! Resetting choice.");
      } else {
        if (this.state.words.includes(selectedWord)) {
          swal(`Nice job! You chose: ${selectedWord}`);
          this.wordIsChosen(wordEnd, selectedWord);
        } else {
          // Check for completion
          if (Object.keys(this.state.chosenWords).length === this.state.words.length) {
            swal("Nice job! Game over :)");
          }
        }
      }
      this.setState({
        wordStart: NO_LETTER
      });
    } else {
      // Start word selection
      this.setState({
        wordStart: {row, col}
      });
    }
  }

  handleSave() {
    const { classLevel, num } = this.props.match.params;
    const { chosenWords } = this.state;

    contentService.submitContent(c.TYPE_WORD_SEARCH, classLevel, num, { chosenWords })
      .then(() => swal("Saved!"))
      .catch(err => swal(`Error: ${err}`));
  }

  /**
   * Update state when a word is selected
   */
  wordIsChosen(wordEnd, selectedWord) {
    const { wordStart, chosenWords } = this.state;

    const chosenCells = this.state.chosenCells.copy();
    const wordDel = {row: wordEnd.row - wordStart.row, col: wordEnd.col - wordStart.col};

    // Fancy functional programming to get the length of the word
    const wordLen = Math.max.apply(null, _.values(wordDel).map(Math.abs));

    for (let i = 0; i <= wordLen; i++) {
      const row = wordStart.row + i * (wordDel.row / wordLen);
      const col = wordStart.col + i * (wordDel.col / wordLen);
      chosenCells.put({row, col});
    }

    this.setState({
      chosenWords: Object.assign(chosenWords, {[selectedWord]: [wordStart, wordEnd]}),
      chosenCells
    });
  }

  generateGrid() {
    console.log(this.state.chosenCells.items);

    return this.state.grid.map((row, rowN) => {
      // TODO add completed to corresponding letters

      const rowJsx = row.split("").map((char, col) => {
        const letterClasses = classNames({
          "wordsearch-letter": true,
          "wordsearch-letter-start": rowN === this.state.wordStart.row && col === this.state.wordStart.col,
          "wordsearch-letter-completed": this.state.chosenCells.has({row: rowN, col})
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
    return this.state.words.map((word, i) => (
      <div className={`wordsearch-word${(word in this.state.chosenWords) ? " strikethrough" : ""}`}
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
