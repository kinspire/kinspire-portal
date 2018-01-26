// PHP passes in
// - chosenWords: { word : [start, finish] }
// - grid
// - words

// Global variable to store the starting point of the word
// This keeps track of which mode we are in right now in terms of choosing a single
// letter or completing an attempted word.
var wordStart;

// Initial setup: go through chosen words and highlight the ones that have been passed
// in from PHP
for (chosenWord in chosenWords) {
  var details = chosenWords[chosenWord];
  wordStart = details[0];
  var wordEnd = details[1];
  wordIsChosen(wordEnd, chosenWord);
}

// Reset to normal state
wordStart = [-1, -1];

/**
 * The click handler for when a letter is clicked.
 */
function onLetterClicked() {
  if (wordStart[0] >= 0) {
    // This is the case that one letter has been clicked and we are selecting the word end
    var wordEnd = getRowCol(this.id);
    var selectedWord = getSelectedWord(wordEnd);
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

$(".wordsearch-letter").click(onLetterClicked);

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
  return $(`#letter-${rowCol[0]}-${rowCol[1]}`);
}

/**
 * Returns a string representing the word chosen from wordStart to
 * wordEnd.
 */
function getSelectedWord(wordEnd) {
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

/**
 * Helper function when a word is chosen.
 *
 * wordEnd: the location of the end of the word
 * selectedWord: the string of the chosen word
 */
function wordIsChosen(wordEnd, selectedWord) {
  var wordDel = [wordEnd[0] - wordStart[0], wordEnd[1] - wordStart[1]];
  var wordLen = Math.max.apply(null, wordDel.map(Math.abs));
  for (var i = 0; i <= wordLen; i++) {
    var row = wordStart[0] + i * (wordDel[0] / wordLen);
    var col = wordStart[1] + i * (wordDel[1] / wordLen);
    getElement([row, col]).addClass('wordsearch-letter-completed');
  }
  // Update array
  chosenWords[selectedWord] = [wordStart, wordEnd];
  $('#wordsearch-word-' + selectedWord).addClass('strikethrough');
}

// Submission
$('.wordsearch-submit').click(function() {
  alert(JSON.stringify(chosenWords));
  $('#chosen-words').val(JSON.stringify(chosenWords));
  document.forms["wordsearch"].submit();
});
