<?php require $_SERVER['DOCUMENT_ROOT']."/includes/logincheck.php"; ?>
<head>
  <?php include $_SERVER['DOCUMENT_ROOT']."/includes/head.php"; ?>
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
    <div class="portal-body flexbox">
      <div class="resources-categories">
        <?php 
        $filename = $_SERVER['DOCUMENT_ROOT'].'/content/stories/details.json';
        $stories_json = json_decode(file_get_contents($filename), true);
        foreach ($stories_json as $id => $details) {
        ?>
        <div class="resources-subcategory">
          <div class="resources-category-content">
            <a class="resources-category-text" href="story/?id=<?php echo $id;?>"><?php echo $details["name"];?></a>
          </div>
        </div>
        <?php } ?>
      </div>
    </div>
  </div>
  <?php require $_SERVER['DOCUMENT_ROOT']."/includes/footer.php"; ?>
  <script src="/js/resources.js"></script>
</body>
