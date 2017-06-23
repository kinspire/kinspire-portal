<?php require $_SERVER['DOCUMENT_ROOT']."/includes/scaffolder.php";
if (!isset($_GET['id'])) { // Need a story
  header("Location: ../");
  return;
}

// Retrieve information from the $_POST variable


// TODO: read in JSON file for other story information such as title
$filename = $_SERVER['DOCUMENT_ROOT'].'/content/stories/'.$_GET['id'].'.json';
$story_json = json_decode(file_get_contents($filename), true);
$story_questions = $story_json["questions"];

// This is only for the colors for now, maybe reconsider this
$filename = $_SERVER['DOCUMENT_ROOT'].'/content/stories/details.json';
$stories_json = json_decode(file_get_contents($filename), true);
$story_details = $stories_json[$_GET['id']];
$story_colors = $story_details['colors'];
head("Story answers", -1, false, $story_colors['primary-color']);
?>
<div class="portal-body">
  <style>
  </style>
  Here are your quiz results!
  <?php
  foreach ($story_questions as $i => $question) {
    $question_value = $_POST['question-'.$i];
    switch ($question["type"]) {
      case "mcq":
        $questionArray = explode("-", $question_value);
        $answerN = end($questionArray);
        $output = $question['choices'][$answerN].
          '&mdash;'.(($answerN == $question["correctChoice"]) ? "CORRECT!" : "WRONG :(");
        break;
      default:
        $output = $question_value;
        break;
    } ?>
    <div>
      <?php echo $i;?>) You answered: <span><?php echo $output;?></span>
    </div>
  <?php }
  ?>
</div>
<?php tail(array('resources')); ?>
