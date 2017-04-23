<?php require $_SERVER['DOCUMENT_ROOT']."/includes/logincheck.php"; ?>
<head>
  <?php include $_SERVER['DOCUMENT_ROOT']."/includes/head.php"; ?>
  <title>Achievements</title>
</head>
<body>
  <?php require $_SERVER['DOCUMENT_ROOT']."/includes/main-menu.php"; ?>
  <div id="portal-content">
    <img id="portal-background" src="/images/home-border.png"/>
    <div id="portal-header">
      <div class="portal-title">Achievements</div>
      <?php require $_SERVER['DOCUMENT_ROOT']."/includes/menu.php";?>
      <?php require $_SERVER['DOCUMENT_ROOT']."/includes/back.php";?>
    </div>
    <div class="portal-body">    
        <div class="row justify-content-start">
            <div class="col-xs-2">
                Creating Account
            </div>
            <div class="col-xs-2">
                First assignment
            </div>
            <div class="col-xs-2">
                Choosing an avatar
            </div>
            <div class="col-xs-2">
                Adding clothing
            </div>
            <div class="col-xs-2">
                Passing first quiz
            </div>
        </div>
    </div>
  </div>
  <?php require $_SERVER['DOCUMENT_ROOT']."/includes/footer.php"; ?>
</body>
