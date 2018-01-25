<?php require $_SERVER['DOCUMENT_ROOT']."/includes/scaffolder.php";
if (!isset($_GET['level']) || !isset($_GET['id'])) { // Need a story
  header("Location: ../");
  return;
}

$level = $_GET['level'];
$id = $_GET['id'];

// This is only for the colors for now, maybe (TODO) reconsider this file reading
$filename = $_SERVER['DOCUMENT_ROOT'].'/content/stories/details.json';
$stories_json = json_decode(file_get_contents($filename), true);
$story_details = $stories_json[$level][$id];
$story_colors = $story_details['colors'];
head("Word Search", -1, false, $story_colors['primary-color']);

require $_SERVER['DOCUMENT_ROOT']."/includes/db.php";

// Get chosen words from POST variable
$chosenWords = json_decode($_POST['chosenWords'], true);

// Check if game over
$user = $_SESSION['user'];
$student_id = $user["student_id"];

$filename = $_SERVER['DOCUMENT_ROOT']."/content/wordsearch/$level-$id.json";
$details = json_decode(file_get_contents($filename), true);
$allWords = $details['words'];

// Game over!
if (count($chosenWords) == count($allWords)) {
  $next_word_search = PDO_FetchOne("SELECT wordsearch_num FROM activities WHERE student_id = :student_id", array("student_id" => $user["student_id"]));

  if ($next_word_search == $id) {
    // This is the next word search, update
    // TODO combine these steps
    PDO_Execute("UPDATE activities SET wordsearch_num=:next_word_search WHERE student_id=:student_id",
      array('next_word_search' => $next_word_search + 1, 'student_id' => $user['student_id']));
  } else if ($next_word_search > $id) {
    // Do nothing, redoing this word search
  } else {
    // Bad skip or something
    echo "ERROR";
    return;
  }
}

PDO_Execute("INSERT INTO activities_statistics (student_id,activity,level,activity_num,answers) VALUES (:student_id,:activity,:level,:activity_num,:answers)",
    array('student_id' => $student_id, 'activity' => "wordsearch", 'level' => $level, 'activity_num' => $id, 'answers' => json_encode($chosenWords))); ?>
<div class="portal-body">
  <style>
    .filler {
      color: <?php echo $story_colors['primary-color'];?>;
    }
  </style>
  <div class="filler">
    Thanks for playing!
    <!-- TODO add link back to home, or next activity -->
    <a class="shadow-button" href="/">Home</a>
  </div>
</div>
<?php tail(array('resources')); ?>
