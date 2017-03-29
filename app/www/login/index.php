<head>
  <?php require $_SERVER['DOCUMENT_ROOT']."/includes/head.php"; ?>
  <title>Kinspire's Portal</title>
</head>
<body>
  <?php require $_SERVER['DOCUMENT_ROOT']."/includes/main-menu.php"; ?>
  <div class="portal-content">
    <div class="portal-header">
      <div class="portal-title portal-title-home">Kinspire's Portal</div>
    </div>
    <div class="portal-body container">
      <div class="login-area">
        <form method="login.php">
          <input class="login-email" placeholder="email"/>
          <input class="login-password" placeholder="pass"/>
          <button type="submit" class="login-button">Log in</button>
        </form>
      </div>
    </div>
  </div>
  <?php require $_SERVER['DOCUMENT_ROOT']."/includes/footer.php"; ?>
</body>
