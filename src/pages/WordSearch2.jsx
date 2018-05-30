// @flow
import React, { Component } from 'react';

import './WordSearch.css';

/**
 * Gets the row and column of the selected letter from its id.
 *
 * @param {string} id
 */
function getRowCol(id) {
  return id.split('-').slice(1).map(function (val) {
    return Number.parseInt(val);
  });
}

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

    this.setState({
      wordStart: [-1, -1]
    });
  }

  /**
   * Returns a string representing the word chosen from wordStart to
   * wordEnd.
   */
  getSelectedWord = (wordEnd) => {
    var wordDel = [wordEnd[0] - wordStart[0], wordEnd[1] - wordStart[1]];
    if ((wordDel[0] === 0 && wordDel[1] === 0)
    || (Math.abs(wordDel[0]) !== Math.abs(wordDel[1]) && wordDel[0] !== 0 && wordDel[1] !== 0)) {
      return null;
    }
    // We have a word!
    var wordLen = Math.max.apply(null, wordDel.map(Math.abs));
    var word = "";
    for (var i = 0; i <= wordLen; i++) {
      var row = wordStart[0] + i * (wordDel[0] / wordLen);
      var col = wordStart[1] + i * (wordDel[1] / wordLen);
      word += grid[row][col];
    }
    return word;
  }

  onLetterClicked = (event) => {
    if (this.state.wordStart[0] >= 0) {
      // This is the case that one letter has been clicked and we are selecting the word end
      var wordEnd = getRowCol(this.id);
      var selectedWord = this.getSelectedWord(wordEnd);
      if (!selectedWord) {
        alert('Choose a word! Resetting choice.');
      } else if (selectedWord in chosenWords) {
        alert('Word already chosen! Resetting choice.');
      } else {
        if (words.includes(selectedWord)) {
          alert('Nice job! You chose: ' + selectedWord);
          wordIsChosen(wordEnd, selectedWord);
        } else {
          // Check for completion
          if (Object.keys(chosenWords).length == words.length) {
            alert("Nice job! Game over :)");
          }
        }
      }
      // Unset the "start"ness of the wordStart
      getElement(wordStart).toggleClass('wordsearch-letter-start');
      wordStart = [-1, -1];
    } else {
      // Start word selection
      wordStart = getRowCol(this.id);
      $(this).toggleClass('wordsearch-letter-start');
    }
  }

  generateGrid = (grid) => {
    return grid.map((row, rowN) => {
      console.log(row);

      let rowJsx = row.split("").map((char, i) => (
        <div
          className="wordsearch-letter" id={`letter-${rowN}-${i}`} key={i}
          onClick={this.onLetterClicked}>
          {char}
        </div>
      ));

      return (
        <div className="wordsearch-row" key={rowN}>
          {rowJsx}
        </div>
      );
    });
  }

  generateWords = (words) => {
    return words.map((word, i) => (
      <div className="wordsearch-word" id={`wordsearch-word-${word}`} key={i}>
        {word}
      </div>
    ));
  }

  render() {
    const { classLevel, storyNumber } = this.props.match.params;
    // TODO optimize when to load file
    let wsJson = require(`../content/wordsearch/${classLevel}/${storyNumber}.json`);

    return (
      <div className="portal-body row">
        <div className="wordsearch-grid-area">
          {generateGrid(wsJson.grid)}
        </div>
        <div className="wordsearch-words">
          {generateWords(wsJson.words)}
        </div>
      </div>
    );
  }
};
