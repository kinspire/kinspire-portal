<?php require $_SERVER['DOCUMENT_ROOT']."/includes/logincheck.php"; ?>
<head>
  <?php include $_SERVER['DOCUMENT_ROOT']."/includes/head.php"; ?>
  <link rel="stylesheet" href="/styles/resources.css" type="text/css"/>
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
    <div class="portal-body">
        <div class="stories-story">
          <div class="stories-story-section">
            <div class="stories-story-section-text">
              <?php
              // TODO: replace 1 with GET[id] or something
              $storyFile = fopen($_SERVER['DOCUMENT_ROOT'].'/content/stories/1.txt', 'r');
              $storyParagraphs = array();
              while (!feof($storyFile)) {
                array_push($storyParagraphs, fgets($storyFile));
              }

              // TODO: format this properly for whatever interaction we want the
              // students to have
              foreach ($storyParagraphs as $paragraph) {
                echo $paragraph;
                echo '<br/><br/>';
              }
              ?>
            </div>
          </div>
          <div class="stories-story-section">
            <div class="stories-story-section-text">
              Questions
            </div>
          </div>
        </div>
    </div>
  </div>
  <?php require $_SERVER['DOCUMENT_ROOT']."/includes/footer.php"; ?>
  <script src="/js/resources.js"></script>
</body>
