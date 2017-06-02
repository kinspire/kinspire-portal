<?php require $_SERVER['DOCUMENT_ROOT']."/includes/scaffolder.php";
// TODO: read in JSON file for other story information such as title
$filename = $_SERVER['DOCUMENT_ROOT'].'/content/stories/details.json';
$stories_json = json_decode(file_get_contents($filename), true);
$story_name = $stories_json[$_GET['id']]['name'];
head($story_name, 1);
?>
<div class="portal-body flexbox">
  <div class="stories-story">
    <div class="stories-story-section">
      <div class="stories-story-text">
        <?php
        require $_SERVER['DOCUMENT_ROOT'].'/content/stories/story-'.$_GET['id'].'.html';
        ?>
      </div>
    </div>
    <div class="stories-story-section">
      Questions
      <ol type="1">
        <?php require $_SERVER['DOCUMENT_ROOT'].'/content/stories/questions-'.$_GET['id'].'.html';?>
      </ol>
      <center><button type="button">Submit!</button></center>
    </div>
  </div>
</div>
<?php tail('resources'); ?>
