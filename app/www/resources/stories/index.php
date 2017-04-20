<?php require $_SERVER['DOCUMENT_ROOT']."/includes/logincheck.php"; ?>
<head>
  <?php include $_SERVER['DOCUMENT_ROOT']."/includes/head.php"; ?>
  <link rel="stylesheet" href="/styles/resources.css" type="text/css"/>
  <link rel="stylesheet" href="/styles/stories.css" type="text/css"/>
  <title>Resources</title>
</head>
<body>
  <?php require $_SERVER['DOCUMENT_ROOT']."/includes/main-menu.php"; ?>
  <div class="portal-content">
    <div class="portal-header">
      <div class="portal-title">Resources</div>
      <?php require $_SERVER['DOCUMENT_ROOT']."/includes/menu.php";?>
      <?php require $_SERVER['DOCUMENT_ROOT']."/includes/back.php";?>
    </div>
    <div class="portal-body">
      <div class="stories-title">Stories</div>
      <div class="stories-content">
        <div id="stories-home">
          Select story:
          <div id="story-1">Story 1</div>
          <div id="story-1">Story 2</div>
        </div>
        <div class="stories-story" id="stories-story">
          <div class="stories-story-text">Story Text</div>
          <div class="stories-story-questions">Story Questions</div>
        </div>
      </div>
    </div>
  </div>
  <?php require $_SERVER['DOCUMENT_ROOT']."/includes/footer.php"; ?>
  <script src="/js/stories.js"></script>
</body>
