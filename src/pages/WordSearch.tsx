import { Button, Grid } from "@material-ui/core";
import classNames from "classnames";
import { get, map, range, set } from "lodash";
import React, { useEffect, useState } from "react";
import Scaffold from "../components/Scaffold";
import { View } from "../constants";
import "./WordSearch.css";

/*
// Get information for title and color
$filename = $_SERVER['DOCUMENT_ROOT'].'/content/stories/details.json';
$stories_json = json_decode(file_get_contents($filename), true);
$story_details = $stories_json[$_GET['id']];
$story_colors = $story_details['colors'];
$story_name = $story_details['name'];
head($story_name, -1, false, $story_colors['primary-color']);

// Retrieve already-solved words
$user = $_SESSION['user'];
$ws_answers = json_decode($user['wordsearch_answers'], true);
// var_dump($ws_answers);
$chosenWords = new ArrayObject();
if (isset($ws_answers[$_GET['id']])) {
  $chosenWords = $ws_answers[$_GET['id']];
} ?>
<div class="portal-body">
  <style>
     TODO: Do better with color assignment
    .wordsearch-letter {
      color: <?php echo $story_colors['primary-color'];?>;
    }

    .wordsearch-word {
      color: <?php echo $story_colors['primary-color'];?>;
    }

    .wordsearch-letter-start {
      background-color: <?php echo $story_colors['secondary-color'];?>;
      color: <?php echo $story_colors['text-color'];?>;
    }

    .wordsearch-letter-completed {
      background-color: <?php echo $story_colors['primary-color'];?>;
      color: <?php echo $story_colors['text-color'];?>;
    }
  </style>
  <div class="flexbox">
    <div class="wordsearch-grid-area">
      <?php
      $filename = $_SERVER['DOCUMENT_ROOT'].'/content/wordsearch/'.$_GET['id'].'.json';
      $wordsearch_json = json_decode(file_get_contents($filename), true);
      $grid = $wordsearch_json['grid'];
      $words = $wordsearch_json['words'];
      ?>
      <?php foreach ($grid as $rowN => $row) {
      ?>
      <div class="wordsearch-row">
        <?php for ($i = 0; $i < strlen($row); $i++) { ?>
          <div class="wordsearch-letter" id="letter-<?php echo $rowN.'-'.$i;?>"><?php echo $row[$i];?></div>
        <?php } ?>
      </div>
      <?php } ?>
    </div>
    <div class="wordsearch-words">
      <?php foreach ($words as $word) {?>
        <div class="wordsearch-word" id="wordsearch-word-<?php echo $word;?>"><?php echo $word;?></div>
      <?php }?>
    </div>
  </div>
  <form name="wordsearch" action="../submitted/?id=<?php echo $_GET['id'];?>" method="post">
    <input type="hidden" name="chosenWords" id="chosen-words">
    <div class="wordsearch-submit shadow-button">
      <div class="shadow-button-text">
        Submit
      </div>
    </div>
  </form>
</div>
<script>
var grid = <?php echo json_encode($grid);?>;
var words = <?php echo json_encode($words);?>;
var chosenWords = <?php echo json_encode($chosenWords);?>;
</script>
<?php tail(array('wordsearch')); ?>
*/

// TODO: lodash-ify

// It's always [row, col]
type RowCol = [number, number];

export default function WordSearch() {
  const grid = map(range(5), x => "abcde");

  const [wordStart, setWordStart] = useState([-1, -1] as RowCol);
  const [chosenWords, setChosenWords] = useState({} as Record<string, [RowCol, RowCol]>);
  const [chosenLetters, setChosenLetters] = useState({} as Record<number, Record<number, boolean>>);
  // All words
  const [words, setWords] = useState([] as string[]);

  // Initial setup with chosenWords
  /*
  for (chosenWord in chosenWords) {
    let details = chosenWords[chosenWord];
    wordStart = details[0];
    let wordEnd = details[1];
    wordIsChosen(wordEnd, chosenWord);
  }
  */

  // TODO When chosenWords is set, update chosenLetters
  useEffect(() => {}, []);

  const handleLetterClick = (row: number, col: number) => {
    if (wordStart[0] >= 0) {
      // Register word selection
      const selectedWord = getSelectedWord(row, col);
      if (!selectedWord) {
        alert("Choose a word! Resetting choice.");
      } else if (selectedWord in chosenWords) {
        alert("Word already chosen! Resetting choice.");
      } else {
        if (words.includes(selectedWord)) {
          alert("Nice job! You chose: " + selectedWord);
          wordIsChosen([row, col], selectedWord);
        } else {
          // Check for completion
          if (Object.keys(chosenWords).length === words.length) {
            alert("Nice job! Game over :)");
          }
        }
      }
      setWordStart([-1, -1]);
    } else {
      // Start word selection
      setWordStart([row, col]);
    }
  };

  /**
   *
   * @param {string} wordEnd
   */
  const getSelectedWord = (rowEnd: number, colEnd: number) => {
    const wordDel = [rowEnd - wordStart[0], colEnd - wordStart[1]];
    if (
      (wordDel[0] === 0 && wordDel[1] === 0) ||
      (Math.abs(wordDel[0]) !== Math.abs(wordDel[1]) && wordDel[0] !== 0 && wordDel[1] !== 0)
    ) {
      return null;
    }
    // We have a word!
    const wordLen = Math.max.apply(null, wordDel.map(Math.abs));
    let word = "";
    for (let i = 0; i <= wordLen; i++) {
      const row = wordStart[0] + i * (wordDel[0] / wordLen);
      const col = wordStart[1] + i * (wordDel[1] / wordLen);
      word += grid[row][col];
    }
    return word;
  };

  // Callback for when a word is chosen
  const wordIsChosen = (wordEnd: RowCol, selectedWord: string) => {
    const wordDel = [wordEnd[0] - wordStart[0], wordEnd[1] - wordStart[1]];
    const wordLen = Math.max.apply(null, wordDel.map(Math.abs));
    for (let i = 0; i <= wordLen; i++) {
      const row = wordStart[0] + i * (wordDel[0] / wordLen);
      const col = wordStart[1] + i * (wordDel[1] / wordLen);
      set(chosenLetters, `[${row}][${col}]`, true);
    }
    setChosenLetters(chosenLetters);

    chosenWords[selectedWord] = [wordStart, wordEnd];
    setChosenWords(chosenWords);
  };

  // Submission
  const handleSubmit = () => {
    /*
    $("#chosen-words").val(JSON.stringify(chosenWords));
    document.forms.wordsearch.submit();
    */
  };

  return (
    <Scaffold view={View.WORD_SEARCH}>
      <Grid container justify="center" alignItems="center" spacing={1}>
        <Grid item xs={6}>
          <div className="wordsearch-grid-area">
            {map(grid, (word, rowN) => (
              <div className="wordsearch-row">
                {map(word, (x, i) => (
                  <div
                    className={classNames("wordsearch-letter", {
                      "wordsearch-letter-start": rowN === wordStart[0] && i === wordStart[1],
                      "wordsearch-letter-completed": get(chosenLetters, `[${rowN}][${i}]`),
                    })}
                    onClick={() => handleLetterClick(rowN, i)}
                  >
                    {x}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className="wordsearch-words"></div>
        </Grid>
        <Grid item>
          <Button>Submit</Button>
        </Grid>
      </Grid>
    </Scaffold>
  );
}
