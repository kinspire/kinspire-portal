// @flow
import React, { Component } from 'react';
import classNames from 'classnames';

import ShadowButton from '../components/ShadowButton';
import HashSet from '../utils/hashset';

import './WordSearch.css';

/**
 * Gets an element given its row-column pair
 */
function getElement(rowCol) {
  return document.getElementById(`letter-${rowCol[0]}-${rowCol[1]}`);
}

export default class WordSearch extends Component {
  propTypes: {
    match: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    // TODO: highlight the initial words
    const { classLevel, storyNumber } = props.match.params;
    // TODO optimize when to load file
    let wsJson = require(`../content/wordsearch/${classLevel}/${storyNumber}.json`);

    this.state = {
      wordStart: [-1, -1],
      grid: wsJson.grid,
      words: wsJson.words,
      chosenWords: {},
      chosenCells: new HashSet(),
    };
  }

  /**
  * Returns a string representing the word chosen from wordStart to
  * wordEnd.
  */
  getSelectedWord = (wordEnd) => {
    const { wordStart, grid } = this.state;
    let wordDelta = [wordEnd[0] - wordStart[0], wordEnd[1] - wordStart[1]];
    if ((wordDelta[0] === 0 && wordDelta[1] === 0)
    || (Math.abs(wordDelta[0]) !== Math.abs(wordDelta[1]) && wordDelta[0] !== 0 && wordDelta[1] !== 0)) {
      return null;
    }
    // We have a word!
    let wordLen = Math.max.apply(null, wordDelta.map(Math.abs));
    let word = "";
    for (let i = 0; i <= wordLen; i++) {
      let row = wordStart[0] + i * (wordDelta[0] / wordLen);
      let col = wordStart[1] + i * (wordDelta[1] / wordLen);
      word += grid[row][col];
    }
    return word;
  }

  handleLetterClicked = (event, row, col) => {
    if (this.state.wordStart[0] >= 0) {
      // This is the case that one letter has been clicked and we are selecting the word end
      let wordEnd = [row, col];
      let selectedWord = this.getSelectedWord(wordEnd);
      if (!selectedWord) {
        alert('Choose a word! Resetting choice.');
      } else if (selectedWord in this.state.chosenWords) {
        alert('Word already chosen! Resetting choice.');
      } else {
        if (this.state.words.includes(selectedWord)) {
          alert('Nice job! You chose: ' + selectedWord);
          this.wordIsChosen(wordEnd, selectedWord);
        } else {
          // Check for completion
          if (Object.keys(this.state.chosenWords).length == this.state.words.length) {
            alert("Nice job! Game over :)");
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

  handleSave = (event) => {
    console.log("Save");
  }

  wordIsChosen = (wordEnd, selectedWord) => {
    const { wordStart, chosenWords } = this.state;
    let chosenCells = this.state.chosenCells.copy();
    let wordDel = [wordEnd[0] - wordStart[0], wordEnd[1] - wordStart[1]];
    // Fancy functional programming to get the length of the word
    let wordLen = Math.max.apply(null, wordDel.map(Math.abs));
    for (let i = 0; i <= wordLen; i++) {
      let row = wordStart[0] + i * (wordDel[0] / wordLen);
      let col = wordStart[1] + i * (wordDel[1] / wordLen);
      chosenCells.put([row, col]);
      // getElement([row, col]).addClass('wordsearch-letter-completed');
    }

    this.setState({
      chosenWords: Object.assign(chosenWords, {[selectedWord]: [wordStart, wordEnd]}),
      chosenCells: chosenCells
    })
  }

  generateGrid = () => {
    return this.state.grid.map((row, rowN) => {
      // TODO add completed to corresponding letters

      let rowJsx = row.split("").map((char, col) => {
        let letterClasses = classNames({
          "wordsearch-letter": true,
          "wordsearch-letter-start": rowN === this.state.wordStart[0] && col === this.state.wordStart[1],
          "wordsearch-letter-completed": this.state.chosenCells.has([rowN, col])
        });

        return (
          <div
            className={letterClasses}
            key={col} onClick={(e) => this.handleLetterClicked(e, rowN, col)}>
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

  generateWords = () => {
    // TODO add strikethrough for selected words

    return this.state.words.map((word, i) => (
      <div className={"wordsearch-word" + ((word in this.state.chosenWords) ? ' strikethrough' : '')}
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
};
