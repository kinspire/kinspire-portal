<?php require $_SERVER['DOCUMENT_ROOT']."/includes/logincheck.php"; ?>
<head>
  <?php require $_SERVER['DOCUMENT_ROOT']."/includes/head.php"; ?>
  <title>Welcome</title>
</head>
<body>
  <?php require $_SERVER['DOCUMENT_ROOT']."/includes/main-menu.php"; ?>
  <div class="portal-content">
    <div class="portal-header">
      <div class="portal-title portal-title-home">Welcome</div>
      <?php require $_SERVER['DOCUMENT_ROOT']."/includes/menu.php";?>
    </div>
    <div class="portal-body container">
      <div class="home-section col-xs-4">
        <div class="home-section-date">
          <div class="home-section-title">Today's date</div>
          <div class="home-section-content">03/24/17</div>
        </div>
        <div class="home-section-quote">
          <div class="home-section-title">Quote of the Day</div>
          <div class="home-section-content">An apple a day keeps the doctor away!</div>
        </div>
      </div>
      <div class="home-section col-xs-4">
        <div class="home-section-title">Next Activity to Try</div>
        <div class="home-section-content">No more activities! Well done :)</div>
      </div>
      <div class="home-section col-xs-4">
        <div class="home-section-title">Your Progress</div>
        <a href="/achievements">View your progress!</a>
      </div>
    </div>
  </div>
  <?php require $_SERVER['DOCUMENT_ROOT']."/includes/footer.php"; ?>
</body>
