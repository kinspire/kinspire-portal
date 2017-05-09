<?php require $_SERVER['DOCUMENT_ROOT']."/includes/logincheck.php"; ?>
<head>
  <?php include $_SERVER['DOCUMENT_ROOT']."/includes/head.php"; ?>
  <link rel="stylesheet" href="/styles/resources.css" type="text/css"/>
  <title>Stories</title>
</head>
<body>
  <?php require $_SERVER['DOCUMENT_ROOT']."/includes/main-menu.php"; ?>
  <div id="portal-content">
    <img id="portal-background" src="/images/home-border.png"/>
    <div id="portal-header">
      <div class="portal-title">Stories</div>
      <?php require $_SERVER['DOCUMENT_ROOT']."/includes/menu.php";?>
      <?php require $_SERVER['DOCUMENT_ROOT']."/includes/back.php";?>
    </div>
    <div class="portal-body">
      <div class="stories-content">
        <div id="stories-home">
          <a class="stories-choose-story" href="story/?id=1">Story 1</a>
          <a class="stories-choose-story" href="story/?id=2">Story 2</a>
        </div>
      </div>
    </div>
  </div>
  <?php require $_SERVER['DOCUMENT_ROOT']."/includes/footer.php"; ?>
  <script src="/js/resources.js"></script>
</body>
