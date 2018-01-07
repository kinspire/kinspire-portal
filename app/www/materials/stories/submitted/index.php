<?php require $_SERVER['DOCUMENT_ROOT']."/includes/scaffolder.php";
if (!isset($_GET['level']) || !isset($_GET['id'])) { // Need a story
  header("Location: ../");
  return;
}

// This is only for the colors for now, maybe (TODO) reconsider this file reading
$filename = $_SERVER['DOCUMENT_ROOT'].'/content/stories/details.json';
$stories_json = json_decode(file_get_contents($filename), true);
$level_details = $stories_json[$_GET['level']];
$story_details = $level_details[$_GET['id']];
$story_colors = $story_details['colors'];
head("Story Answers", -1, false, $story_colors['primary-color']);

// Save answers to the database
require $_SERVER['DOCUMENT_ROOT']."/includes/db.php";

$user = $_SESSION['user'];
$next_story = PDO_FetchOne("SELECT stories_num FROM learning_resources WHERE student_id = :student_id", array("student_id" => $user["student_id"]));

if ($next_story == $_GET['id']) {
  // This is the next story 
  // TODO combine these steps
  PDO_Execute("UPDATE learning_resources SET stories_num=:stories_num WHERE student_id=:student_id",
    array('stories_num' => $next_story + 1, 'student_id' => $user['student_id']));
  $_SESSION['user']['next_story'] = $next_story + 1;
} else if ($next_story > $_GET['id']) {
  // Do nothing, redoing this story
} else {
  // Bad skip or something
  echo "ERROR";
  return;
}

// Read in JSON file for other story information such as title and questions
$filename = $_SERVER['DOCUMENT_ROOT'].'/content/stories/'.$_GET['level'].'/'.$_GET['id'].'.json';
$story_json = json_decode(file_get_contents($filename), true);
$story_questions = $story_json["questions"];
$answers = array();
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

// Execute and save the answers as a new row in _statistics
PDO_Execute(
    "INSERT INTO learning_resources_statistics (student_id, learning_resource, level, learning_resource_num, answers) VALUES (:student_id, :lr, :level, :lrn, :answers)",
    array(
        "student_id" => $user["student_id"],
        "lr" => "story",
        "level" => $_GET["level"],
        "lrn" => $_GET["id"],
        "answers" => json_encode($answers)
    )
);
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
    <a class="shadow-button" href="/">Home</a>
  </div>
</div>
<?php tail(array('resources')); ?>
