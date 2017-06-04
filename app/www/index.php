<?php require $_SERVER['DOCUMENT_ROOT']."/includes/scaffolder.php";
head('Welcome', 0);
?>
<div class="portal-body">
  <div class="home-section col-xs-4">
    <div class="home-section-date">
      <div class="home-section-title">Today's date</div>
      <div class="home-section-content">05/09/17</div>
    </div>
    <div class="home-section-quote">
      <div class="home-section-title">Quote of the Day</div>
      <div class="home-section-content">An apple a day keeps the doctor away!</div>
    </div>
  </div>
  <div class="home-section col-xs-4">
    <div class="home-section-title">Next Activity to Try</div>
    <div class="home-section-content">
      Worksheet 1<br/>
      Worksheet 2<br/>
      Worksheet 3<br/>
      Worksheet 4<br/>
      Worksheet 5<br/>
      Worksheet 6<br/>
      Worksheet 7<br/>
      Worksheet 8<br/>
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
</div>
<?php
tail();
?>