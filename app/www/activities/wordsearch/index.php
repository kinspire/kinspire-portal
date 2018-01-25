<?php require $_SERVER['DOCUMENT_ROOT']."/includes/scaffolder.php";
head("Word Search");
?>
<div class="portal-body">
  <div class="resources-categories">
    <div class="resources-category-container">
      <?php
      $user = $_SESSION['user'];
      $level = $user["difficulty_level"];

      require $_SERVER["DOCUMENT_ROOT"]."/includes/db.php";

      $next_story = PDO_FetchOne("SELECT stories_num FROM learning_resources WHERE student_id = :student_id", array("student_id" => $user["student_id"]));
      $next_word_search = PDO_FetchOne("SELECT wordsearch_num FROM activities WHERE student_id = :student_id", array("student_id" => $user["student_id"]));

      if ($next_story - $next_word_search == 0) { ?>
        <div class="filler">
          No activities available!
        </div>
      <?php } else {
        $filename = $_SERVER['DOCUMENT_ROOT'].'/content/stories/details.json';
        $stories_json = json_decode(file_get_contents($filename), true);

        for ($i = $next_word_search; $i < $next_story; $i++) { ?>
        <a class="resources-category" href="play/?level=<?php echo $level;?>&id=<?php echo $i;?>">
          <div class="resources-category-content">
            <div class="resources-category-text"><?php echo $stories_json[$level][$i]["name"];?></div>
          </div>
        </a>
        <?php }
      }
      ?>
    </div>
  </div>
</div>
<?php tail(); ?>
