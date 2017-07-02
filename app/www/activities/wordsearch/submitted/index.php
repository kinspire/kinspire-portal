<?php require $_SERVER['DOCUMENT_ROOT']."/includes/scaffolder.php";
if (!isset($_GET['id'])) { // Need a story
  header("Location: ../");
  return;
}
// This is only for the colors for now, maybe (TODO) reconsider this file reading
$filename = $_SERVER['DOCUMENT_ROOT'].'/content/stories/details.json';
$stories_json = json_decode(file_get_contents($filename), true);
$story_details = $stories_json[$_GET['id']];
$story_colors = $story_details['colors'];
head("Word Search", -1, false, $story_colors['primary-color']);

require $_SERVER['DOCUMENT_ROOT']."/includes/db.php";

// Get chosen words from POST variable
$chosenWordsStr = $_POST['chosenWords'];
$chosenWords = json_decode($chosenWordsStr, true);

// Check if game over
$user = $_SESSION['user'];
$next_word_search = $user['next_word_search'];

$filename = $_SERVER['DOCUMENT_ROOT'].'/content/wordsearch/1.json';
$details = json_decode(file_get_contents($filename), true);
$allWords = $details['words'];
if (count($chosenWords) == count($allWords)) {
  // Game over!
  if ($next_word_search == $_GET['id']) {
    // This is the next word search 
    // TODO combine these steps
    PDO_Execute("UPDATE users SET next_word_search=:next_word_search WHERE username=:username",
      array('next_word_search' => $next_word_search + 1, 'username' => $user['username']));
    $user['next_word_search'] = $next_word_search + 1;
  } else if ($next_word_search > $_GET['id']) {
    // Do nothing, redoing this word search
  } else {
    // Bad skip or something
    echo "ERROR";
    return;
  }
}

// Save in session
$wordsearch_answers = json_decode($user['wordsearch_answers'], true);
$wordsearch_answers[$_GET['id']] = $chosenWords;
$user['wordsearch_answers'] = json_encode($wordsearch_answers);
$_SESSION['user'] = $user;

// Save on db
PDO_Execute("UPDATE users SET wordsearch_answers=:wordsearch_answers WHERE username=:username",
  array('wordsearch_answers' => $user['wordsearch_answers'], 'username' => $user['username']));

?>
<div class="portal-body">
  <style>
    .filler {
      color: <?php echo $story_colors['primary-color'];?>;
    }
  </style>
  <div class="filler">
    Thanks for playing!
    <!-- TODO add link back to home, or next activity -->
  </div>
</div>
<?php tail(array('resources')); ?>
