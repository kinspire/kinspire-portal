<?php
session_start();
if ((isset($_SESSION['login']) && $_SESSION['login'] != '')) {
  header ("Location: ../");
}
?>
<head>
  <?php require $_SERVER['DOCUMENT_ROOT']."/includes/head.php"; ?>
  <title>Kinspire's Portal</title>
</head>
<body>
  <?php require $_SERVER['DOCUMENT_ROOT']."/includes/main-menu.php"; ?>
  <div id="portal-content">
    <img id="portal-background" src="/images/home-border.png"/>
    <div id="portal-header">
      <div class="portal-title portal-title-home">Kinspire's Portal</div>
    </div>
    <div class="portal-body">
      <div class="login-area">
        <form method="post" action="login.php">
          <input class="login-email" type="email" name="email" placeholder="email" value="test@test.org"/>
          <input class="login-password" type="password" name="password" placeholder="pass" value="test"/>
          <button type="submit" name="login" class="login-button">Log in</button>
          <button type="submit" name="signup" class="login-button">Sign up</button>
        </form>
      </div>
    </div>
  </div>
  <?php require $_SERVER['DOCUMENT_ROOT']."/includes/footer.php"; ?>
</body>
