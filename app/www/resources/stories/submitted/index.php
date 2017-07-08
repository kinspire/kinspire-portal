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
head("Story Answers", -1, false, $story_colors['primary-color']);

// Save answers to the database
require $_SERVER['DOCUMENT_ROOT']."/includes/db.php";

$user = $_SESSION['user'];
$next_story = $user['next_story'];
if ($next_story == $_GET['id']) {
  // This is the next story 
  // TODO combine these steps
  PDO_Execute("UPDATE users SET next_story=:next_story WHERE username=:username",
    array('next_story' => $next_story + 1, 'username' => $user['username']));
  $_SESSION['user']['next_story'] = $next_story + 1;
} else if ($next_story > $_GET['id']) {
  // Do nothing, redoing this story
} else {
  // Bad skip or something
  echo "ERROR";
  return;
}

// Read in JSON file for other story information such as title
// Save answers to db
$story_answers = json_decode(PDO_FetchOne("SELECT story_answers FROM users WHERE username = :username", array("username" => $user['username'])), TRUE);
$answers = array();

$filename = $_SERVER['DOCUMENT_ROOT'].'/content/stories/'.$_GET['id'].'.json';
$story_json = json_decode(file_get_contents($filename), true);
$story_questions = $story_json["questions"];
foreach ($story_questions as $question) {
  $i = $question["number"];
  $question_value = $_POST['question-'.$i];
  switch ($question["type"]) {
    case "mcq":
      $questionArray = explode("-", $question_value);
      $answerN = end($questionArray);
      $answers[$i] = $answerN;
      break;
    default:
      $answers[$i] = $question_value;
      break;
  }
}
$story_answers[$_GET['id']] = $answers;
PDO_Execute("UPDATE users SET story_answers = :story_answers WHERE username = :username",
  array("story_answers" => json_encode($story_answers), "username" => $user['username']));
?>
<div class="portal-body">
  <style>
    .filler {
      color: <?php echo $story_colors['primary-color'];?>;
    }
  </style>
  <div class="filler">
    Thanks for submitting! A tutor is grading your work.
    <!-- TODO add link back to home, or next activity -->
  </div>
</div>
<?php tail(array('resources')); ?>
