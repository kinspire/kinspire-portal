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
$chosenWords = $_POST['chosenWords'];
var_dump($chosenWords);

// Save in session
$user = $_SESSION['user'];
$wordsearch_answers = json_decode($user['wordsearch_answers'], true);
$wordsearch_answers[$_GET['id']] = json_decode($chosenWords, true);
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
