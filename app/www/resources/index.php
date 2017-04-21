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
    <div class="portal-header">
      <div class="portal-title">Resources</div>
      <?php require $_SERVER['DOCUMENT_ROOT']."/includes/menu.php";?>
      <?php require $_SERVER['DOCUMENT_ROOT']."/includes/back.php";?>
    </div>
    <div class="portal-body">
      <!-- banner - can be dynamic, changing banner messages, three dots at the bottom -->
      <!-- padding -->
      <div class="resources-banner">
        Congratulations! You completed Exercise #1.
      </div>
      <!-- category list -> two columns if overflow -->
      <!-- category #1: stories -->
      <div class="resources-categories">
        <div class="resources-category" onclick="stories()">Stories</div>
      </div>
    </div>
  </div>
  <?php require $_SERVER['DOCUMENT_ROOT']."/includes/footer.php"; ?>
  <script src="/js/resources.js"></script>
</body>
