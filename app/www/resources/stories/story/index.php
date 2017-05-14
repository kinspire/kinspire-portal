<?php require $_SERVER['DOCUMENT_ROOT']."/includes/logincheck.php"; ?>
<head>
  <?php include $_SERVER['DOCUMENT_ROOT']."/includes/head.php"; ?>
  <link rel="stylesheet" href="/styles/resources.css" type="text/css"/>
  <link rel="stylesheet" href="/styles/stories.css" type="text/css"/>
  <title>Story</title>
</head>
<body>
  <?php require $_SERVER['DOCUMENT_ROOT']."/includes/main-menu.php"; ?>
  <div id="portal-content">
    <img id="portal-background" src="/images/home-border.png"/>
    <div id="portal-header">
      <div class="portal-title">Story</div>
      <?php require $_SERVER['DOCUMENT_ROOT']."/includes/menu.php";?>
      <?php require $_SERVER['DOCUMENT_ROOT']."/includes/back.php";?>
    </div>
    <div class="portal-body flexbox">
      <div class="stories-story">
        <div class="stories-story-section">
          <?php
          require $_SERVER['DOCUMENT_ROOT'].'/content/stories/'.$_GET['id'].'.html';
          ?>
        </div>
        <div class="stories-story-section">
          Questions
        </div>
      </div>
    </div>
  </div>
  <?php require $_SERVER['DOCUMENT_ROOT']."/includes/footer.php"; ?>
  <script src="/js/resources.js"></script>
</body>
