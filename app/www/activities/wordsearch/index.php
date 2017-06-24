<?php require $_SERVER['DOCUMENT_ROOT']."/includes/scaffolder.php";
head("Word Search");
?>
<div class="portal-body">
  <div class="resources-categories">
    <div class="resources-category-container">
      <?php
      $user = $_SESSION['user'];
      $next_story = $user['next_story'];
      $next_word_search = $user['next_word_search'];

      if ($next_story - $next_word_search == 0) { ?>
        <div class="filler">
          No activities available!
        </div>
      <?php } else {
        $filename = $_SERVER['DOCUMENT_ROOT'].'/content/stories/details.json';
        $stories_json = json_decode(file_get_contents($filename), true);

        for ($i = $next_word_search; $i < $next_story; $i++) { ?>
        <a class="resources-category" href="play/?id=<?php echo $i;?>">
          <div class="resources-category-content">
            <div class="resources-category-text"><?php echo $stories_json[$i]["name"];?></div>
          </div>
        </a>
        <?php }
      }
      ?>
    </div>
  </div>
</div>
<?php tail(); ?>
