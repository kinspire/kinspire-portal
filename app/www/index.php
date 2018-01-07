<?php require $_SERVER['DOCUMENT_ROOT']."/includes/scaffolder.php";
head('Welcome to the Portal!', 0);
require $_SERVER['DOCUMENT_ROOT'].'/includes/db.php';
?>
<div class="portal-body">
  <div class="home-section col-xs-3">
    <!-- <div class="home-section-date">
      <div class="home-section-title">Today's date</div>
      <div class="home-section-content"></div>
    </div> -->
    <div class="home-section-quote">
      <div class="home-section-title">Quote of the Day</div>
      <div class="home-section-content">An apple a day keeps the doctor away!</div>
    </div>
  </div>
  <div class="home-section col-xs-6">
    <div class="home-section-title">Next Activity to Try</div>
    <div class="home-section-content">
      <?php
      $user = $_SESSION['user'];
      $level = $user["difficulty_level"];
      $filename = $_SERVER['DOCUMENT_ROOT'].'/content/stories/details.json';
      $stories_json = json_decode(file_get_contents($filename), true);

      // 1. STORIES
      $next_story = PDO_FetchOne("SELECT stories_num FROM learning_resources WHERE student_id = :student_id", array("student_id" => $user["student_id"]));

      // Check if next story even exists
      if (isset($stories_json['' + $level][$next_story])) { ?>
      <a class="home-next-activity shadow-button" href="/materials/stories/story/?level=<?php echo $level;?>&id=<?php echo $next_story;?>">
        <div class="shadow-button-text home-next-activity-category">
          Story
        </div>
        <div class="home-next-activity-details">
          <?php echo $next_story.': '.$stories_json['' + $level][$next_story]['name']; ?>
        </div>
      </a>
      <?php 
      }

      // 2. WORD SEARCH
      $next_word_search = PDO_FetchOne("SELECT wordsearch_num FROM activities WHERE student_id = :student_id", array("student_id" => $user["student_id"]));
      for ($i = $next_word_search; $i < $next_story; $i++) {
        // TODO: check if next word search even exists ?>
        <a class="home-next-activity shadow-button" href="/activities/wordsearch/play/?level=<?php echo $level;?>&id=<?php echo $i;?>">
          <div class="shadow-button-text home-next-activity-category">
            Word Search
          </div>
          <div class="home-next-activity-details">
            <?php echo $i.': '.$stories_json['' + $level][$i]['name']; ?>
          </div>
        </a>
      <?php } ?>
    </div>
  </div>
  <div class="home-section col-xs-3">
    <div class="home-section-title">Your Progress</div>
    <div class="home-section-progress">
      <a href="achievements/">
        <img class="home-section-progress-image" src="images/home-page-envelope-with-medal.png"/>
      </a>
    </div>
  </div>
  <div class="home-avatars">
    <img class="home-avatar" src="/images/avatar/<?php echo $user['avatar'];?>.svg">
  </div>
</div>
<?php
tail();
?>
