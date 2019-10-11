import React, { Component } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import swal from "sweetalert";
import _ from "lodash";

import ShadowButton from "../components/ShadowButton";
import HashSet from "../utils/hashset";
import { contentConstants as c } from "../constants";
import contentService from "../services/contentService";

import "./WordSearch.css";

// Represents no letter being selected
const NO_LETTER = { row: -1, col: -1 };

export default class WordSearch extends Component {
  constructor(props) {
    super(props);

    // State:
    // - wordStart: stores the location of the start letter of the word currently
    // being chosen
    // - grid: stores the entire grid of letters
    // - words: stores all of the words that need to be found
    // - chosenWords: a map from word to [word start location, word end location]
    // - chosenCells: a set of all chosen cells, used for UI coloring
    this.state = {
      wordStart: NO_LETTER,
      correctWord : false,
      grid: [],
      words: [],
      chosenWords: {}, // map of word to [word Start, word End]
      chosenCells: new HashSet(),
      currentCells: new HashSet()
    };

    this.handleLetterClicked          = this.handleLetterClicked.bind(this);
    this.handleSave                   = this.handleSave.bind(this);
    this.handleReset                  = this.handleReset.bind(this);
  }

  // On mount, load the content as well as the content progress for the word
  // search.
  componentDidMount() {
    const { classLevel, num } = this.props.match.params;

    Promise.all([
      contentService.getContent(c.TYPE_WORD_SEARCH, classLevel, num),
      contentService.getContentProgress(c.TYPE_WORD_SEARCH, classLevel, num),
    ])
      .then(values => {
        const [ content, progress ] = values;

        const state = { grid: content.grid, words: content.words };

        // If there is some progress existing for this user, we construct the
        // chosenCells hash set.
        if (!_.isEmpty(progress)) {
          const chosenCells = new HashSet();

          _.forOwn(progress.chosenWords, (startEnd) => {
            const [ wordStart, wordEnd ] = startEnd;
            const wordDel = { row: wordEnd.row - wordStart.row, col: wordEnd.col - wordStart.col };

            // Fancy functional programming to get the length of the word
            const wordLen = Math.max.apply(null, _.values(wordDel).map(Math.abs));

            // Add all cells that the word contains to chosenCells
            for (let i = 0; i <= wordLen; i++) {
              //swal("Row" + col);
              //swal("Col" + col);
              const row = wordStart.row + i * (wordDel.row / wordLen);
              const col = wordStart.col + i * (wordDel.col / wordLen);
              chosenCells.put({row, col});
            }
          });

          state.chosenWords = progress.chosenWords;
          state.chosenCells = chosenCells;
          state.correctWord = false;
        }

      // Set state loaded from the database
      this.setState(state);
    });
  }

  // Returns a string representing the word chosen from this.state.wordStart to
  // wordEnd.
  getSelectedWord(wordEnd) {
    const currentCells = this.state.currentCells.copy();
    const { wordStart, grid } = this.state;
    const wordDelta = {row: wordEnd.row - wordStart.row, col: wordEnd.col - wordStart.col};
    const wordEnding = {row: wordEnd.row, col: wordStart.row};
    // Has to be a valid diagonal/horizontal/vertical
    if (
      (wordDelta.row === 0 && wordDelta.col === 0) ||
      (Math.abs(wordDelta.row) !== Math.abs(wordDelta.col) &&
        wordDelta.row !== 0 &&
        wordDelta.col !== 0)
    ) {
      return null;
    }
    // We have a word!

    const wordLen = Math.max.apply(null, _.values(wordDelta).map(Math.abs));
    let word = "";
    for (let i = 0; i <= wordLen; i++) {
      const row = wordStart.row + i * (wordDelta.row / wordLen);
      const col = wordStart.col + i * (wordDelta.col / wordLen);
      currentCells.put({row,col});
      word += grid[row][col];
    }
    //swal("Hello " + word);
    this.setState({
      currentCells : currentCells,
    })
    return word;
  }

  handleLetterClicked(row, col) {
    const currentCells = new HashSet();
    if (this.state.wordStart.row >= 0) {
      // This is the case that one letter has been clicked and we are selecting the word end
      const wordEnd = { row, col };
      const selectedWord = this.getSelectedWord(wordEnd);
      if (!selectedWord) {
        swal("Choose a word! Resetting choice.");
      } else if (selectedWord in this.state.chosenWords) {
        swal("Word already chosen! Resetting choice.");
      } else if (this.state.words.includes(selectedWord)) {
        //if branch for valid word but not a word in the word bank
        swal(`Nice job! You chose: ${selectedWord}`);
        this.wordIsChosen(wordEnd, selectedWord);
        this.correctWord = true;
      } else if (Object.keys(this.state.chosenWords).length === this.state.words.length) {
        // Check for completion
        swal("Nice job! Game over :)");
      } else {
        swal(`${selectedWord  } isn't what we are looking for, try again!`);
      }
      this.setState({
        wordStart: NO_LETTER,
      });
    } else {
      // Start word selection
      this.setState({
        wordStart: {row, col},
        currentCells : currentCells,
      });
    }
  }

  // Saves the content progress to the database
  handleSave() {
    const { classLevel, num } = this.props.match.params;
    const { chosenWords } = this.state;

    contentService
      .submitContentProgress(c.TYPE_WORD_SEARCH, classLevel, num, {
        chosenWords
      })
      .then(() => swal("Saved!"))
      .catch(err => swal(`Error: ${err}`));
  }

  handleReset() {
    const{ classLevel, num} = this.props.match.params;
    contentService.deleteContent(c.TYPE_WORD_SEARCH, classLevel, num);
    swal("To start over, press back and click on the word search again!");
  }

  // Update state when a word is selected
  wordIsChosen(wordEnd, selectedWord) {
    const { wordStart, chosenWords } = this.state;
    const chosenCells = this.state.chosenCells.copy();
    const wordDel = {
      row: wordEnd.row - wordStart.row,
      col: wordEnd.col - wordStart.col
    };

    // Fancy functional programming to get the length of the word
    const wordLen = Math.max.apply(null, _.values(wordDel).map(Math.abs));

    for (let i = 0; i <= wordLen; i++) {
      const row = wordStart.row + i * (wordDel.row / wordLen);
      const col = wordStart.col + i * (wordDel.col / wordLen);
      chosenCells.put({ row, col });
    }

    this.setState({
      chosenWords: Object.assign(chosenWords, {
        [selectedWord]: [wordStart, wordEnd]
      }),
      chosenCells
    });
  }

  // Convert the local grid state into the grid view
  generateGrid() {
    return this.state.grid.map((rowLetters, row) => (
      <div className="wordsearch-row" key={row}>
        {rowLetters.split("").map((char, col) => {
          // Per-letter styling
          const letterClasses = classNames({
            "wordsearch-letter": true,
            "wordsearch-letter-start": row === this.state.wordStart.row && col === this.state.wordStart.col,
            //if(correctWord){
            "wordsearch-letter-incorrect": this.state.currentCells.has({row,col}),
            "wordsearch-letter-completed":  this.state.chosenCells.has({row, col}),
            //}else{

            //}

            //"wordsearch-letter-completed": true
          });
          //swal("assignment");
          return (
            <div
              className={letterClasses}
              key={col}
              onClick={this.handleLetterClicked.bind(this, row, col)}
            >
              {char}
            </div>
          );
        })}
      </div>
    ));
  }

  render() {
    return (
      <div className="portal-body">
        <div className="row">
          <div className="wordsearch-grid-area">{this.generateGrid()}</div>
          <div className="wordsearch-words">
            {this.state.words.map((word, i) => (
              <div
                className={`wordsearch-word${
                  _.has(this.state.chosenWords, word) ? " strikethrough" : ""
                }`}
                key={i}
              >
                {word}
              </div>
            ))}
          </div>
        </div>
        <div className="row buttons">
          <ShadowButton className="button" text="Save" onClick={this.handleSave} />
          <ShadowButton className="button" text="Start Over!" onClick={this.handleReset}/>
        </div>
      </div>
    );
  }
}

WordSearch.propTypes = {
  match: PropTypes.object.isRequired
};
