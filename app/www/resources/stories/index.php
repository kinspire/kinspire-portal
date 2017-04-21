<?php require $_SERVER['DOCUMENT_ROOT']."/includes/logincheck.php"; ?>
<head>
  <?php include $_SERVER['DOCUMENT_ROOT']."/includes/head.php"; ?>
  <link rel="stylesheet" href="/styles/resources.css" type="text/css"/>
  <title>Resources</title>
</head>
<body>
  <?php require $_SERVER['DOCUMENT_ROOT']."/includes/main-menu.php"; ?>
  <div class="portal-content">
    <img class="portal-background" src="/images/home-border.png"/>
    <div class="portal-content-content">
      <div class="portal-header">
        <div class="portal-title">Resources</div>
        <?php require $_SERVER['DOCUMENT_ROOT']."/includes/menu.php";?>
        <?php require $_SERVER['DOCUMENT_ROOT']."/includes/back.php";?>
      </div>
      <div class="portal-body">
        <div class="stories-title">
          <div>Stories</div>
          <div id="stories-back">Choose Story</div>
        </div>
        <div class="stories-content">
          <div id="stories-home">
            <div id="story-1" class="stories-choose-story">Story 1</div>
            <div id="story-2" class="stories-choose-story">Story 2</div>
          </div>
          <div id="stories-story">
            <div class="stories-story-section">
              <?php
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
            <div class="stories-story-section">
              Questions
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <?php require $_SERVER['DOCUMENT_ROOT']."/includes/footer.php"; ?>
  <script src="/js/resources.js"></script>
</body>
