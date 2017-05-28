<?php require $_SERVER['DOCUMENT_ROOT']."/includes/logincheck.php"; ?>
<head>
  <?php include $_SERVER['DOCUMENT_ROOT']."/includes/head.php"; ?>
  <title>Resources</title>
</head>
<body>
  <?php require $_SERVER['DOCUMENT_ROOT']."/includes/main-menu.php"; ?>
  <div id="portal-content">
    <img id="portal-background" src="/images/home-border.png"/>
    <div id="portal-header">
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
      <div class="resources-categories">
        <a class="resources-category" href="stories/">
          <div class="resources-category-text">Stories</div>
        </a>
        <!--<a class="resources-category" href="vocab/">
          <div class="resources-category-text">Vocabulary</div>
        </a>-->
      </div>
      <!--<div class="resources-categories">
        <a class="resources-category" href="templates/">
          <div class="resources-category-text">Templates</div>
        </a>
      </div>-->
    </div>
  </div>
  <?php require $_SERVER['DOCUMENT_ROOT']."/includes/footer.php"; ?>
  <script src="/js/resources.js"></script>
</body>
