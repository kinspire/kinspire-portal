<head>
  <?php require $_SERVER['DOCUMENT_ROOT']."/includes/style.php"; ?>
  <title>Welcome</title>
</head>
<body>
  <?php require $_SERVER['DOCUMENT_ROOT']."/includes/header.php"; ?>
  <div class="portal-content">
    <div class="portal-header">Welcome</div>
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
        <div class="home-section-content">Progress coming soon!</div>
      </div>
    </div>
    <?php require $_SERVER['DOCUMENT_ROOT']."/includes/menu.php";?>
  </div>
  <?php require $_SERVER['DOCUMENT_ROOT']."/includes/footer.php"; ?>
</body>
