<?php require $_SERVER['DOCUMENT_ROOT']."/includes/scaffolder.php";
head('Welcome!', 0);
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
      $filename = $_SERVER['DOCUMENT_ROOT'].'/content/stories/details.json';
      $stories_json = json_decode(file_get_contents($filename), true);

      // 1. STORIES
      $next_story = $user['next_story'];

      // TODO: check if next story even exists ?>
      <a class="home-next-activity" href="/resources/stories/story/?id=<?php echo $next_story;?>">
        <div class="home-next-activity-category">
          Story
        </div>
        <div class="home-next-activity-details">
          <?php echo $next_story.': '.$stories_json['' + $next_story]['name']; ?>
        </div>
      </a>

      <?php 
      // 2. WORD SEARCH
      $next_word_search = $user['next_word_search'];
      for ($i = $next_word_search; $i < $next_story; $i++) {
        // TODO: check if next word search even exists ?>
        <a class="home-next-activity" href="/activities/wordsearch/play/?id=<?php echo $i;?>">
          <div class="home-next-activity-category">
            Word Search
          </div>
          <div class="home-next-activity-details">
            <?php echo $i.': '.$stories_json['' + $i]['name']; ?>
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
    <img class="home-avatar" src="/images/avatar/brownsquare.svg">
    <img class="home-avatar" src="/images/avatar/greenpentagon.svg">
  </div>
</div>
<?php
tail();
?>
