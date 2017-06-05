<?php require $_SERVER['DOCUMENT_ROOT']."/includes/scaffolder.php";
head('Welcome!', 0);
?>
<div class="portal-body">
  <div class="home-section col-xs-4">
    <div class="home-section-date">
      <div class="home-section-title">Today's date</div>
      <div class="home-section-content"><?php echo date('d/m/Y'); ?></div>
    </div>
    <div class="home-section-quote">
      <div class="home-section-title">Quote of the Day</div>
      <div class="home-section-content">An apple a day keeps the doctor away!</div>
    </div>
  </div>
  <div class="home-section col-xs-4">
    <div class="home-section-title">Next Activity to Try</div>
    <div class="home-section-content">
      <div class="home-next-activity">Story 1</div>
      <div class="home-next-activity">Worksheet 2</div>
      <div class="home-next-activity">Worksheet 3</div>
    </div>
  </div>
  <div class="home-section col-xs-4">
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
    <img class="home-avatar" src="/images/avatar/orangetriangle.svg">
    <img class="home-avatar" src="/images/avatar/bluehexagon.svg">
    <img class="home-avatar" src="/images/avatar/purplecircle.svg">
    <img class="home-avatar" src="/images/avatar/redrhombus.svg">
  </div>
</div>
<?php
tail();
?>