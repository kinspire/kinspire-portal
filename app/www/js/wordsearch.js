var wordStart = [-1, -1];

$(".wordsearch-letter").click(function () {
    if (wordStart[0] >= 0) {
        // Register word selection
        var selectedWord = getSelectedWord(getRowCol(this.id));
        if (!selectedWord) {
            alert('Choose a word!');
            return;
        }
        if (words.includes(selectedWord)) {
            alert('Nice job! You chose: ' + selectedWord);
        }
    } else {
        // Start word selection
        wordStart = getRowCol(this.id);
        $(this).toggleClass('wordsearch-letter-start');
    }
});

/**
 * Gets the row and column of the selected letter from its id.
 * 
 * @param {string} id 
 */
function getRowCol(id) {
    return id.split('-').slice(1);
}

/**
 * 
 * @param {string} wordEnd 
 */
function getSelectedWord(wordEnd) {
    var wordDel = [wordEnd[0] - wordStart[0], wordEnd[1] - wordStart[1]];
    if ((wordDel[0] === 0 && wordDel[1] === 0)
    || (wordDel[0] !== wordDel[1])) {
        return null;
    }
    // We have a word!
    var wordLen = Math.max(wordDel);
    var word = "";
    for (var i = 0; i < wordLen; i++) {
        var row = wordStart[0] + i * (wordDel[0] / wordLen);
        var col = wordStart[1] + i * (wordDel[1] / wordLen);
        word += grid[row][col];
    }
    return word;
}