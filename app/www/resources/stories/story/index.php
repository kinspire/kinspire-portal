<?php require $_SERVER['DOCUMENT_ROOT']."/includes/logincheck.php"; ?>
<head>
  <?php include $_SERVER['DOCUMENT_ROOT']."/includes/head.php"; ?>
  <title>Story</title>
</head>
<body>
  <?php require $_SERVER['DOCUMENT_ROOT']."/includes/main-menu.php"; ?>
  <?php
  // TODO: read in JSON file for other story information such as title
  $filename = $_SERVER['DOCUMENT_ROOT'].'/content/stories/details.json';
  $stories_json = json_decode(file_get_contents($filename), true);
  ?>
  <div id="portal-content">
    <img id="portal-background" src="/images/home-border.png"/>
    <div id="portal-header">
      <div class="portal-title"><?php echo $stories_json[$_GET['id']]['name'];?></div>
      <div class="portal-subtitle">Stories</div>
      <?php require $_SERVER['DOCUMENT_ROOT']."/includes/menu.php";?>
      <?php require $_SERVER['DOCUMENT_ROOT']."/includes/back.php";?>
    </div>
    <div class="portal-body flexbox">
      <div class="stories-story">
        <div class="stories-story-section">
          <div class="stories-story-text">
            <?php
            require $_SERVER['DOCUMENT_ROOT'].'/content/stories/story-'.$_GET['id'].'.html';
            ?>
          </div>
        </div>
        <div class="stories-story-section">
          Questions
          <ol type="1">
          <?php require $_SERVER['DOCUMENT_ROOT'].'/content/stories/questions-'.$_GET['id'].'.html';?>
          </ol>
          <center><button type="button">Submit!</button></center>
        </div>
      </div>
    </div>
  </div>
  <?php require $_SERVER['DOCUMENT_ROOT']."/includes/footer.php"; ?>
  <script src="/js/resources.js"></script>
</body>
