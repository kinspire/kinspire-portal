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
      // TODO: get the next activities from database
      $filename = $_SERVER['DOCUMENT_ROOT'].'/content/stories/details.json';
      $stories_json = json_decode(file_get_contents($filename), true);
      for ($id = 1; $id <= 1; $id++) { ?>
        <a class="home-next-activity" href="/resources/stories/story/?id=<?php echo $id;?>">
          <div class="home-next-activity-category">
            Story
          </div>
          <div class="home-next-activity-details">
            <?php echo $stories_json['' + $id]['name']; ?>
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
