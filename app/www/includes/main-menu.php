<span>
  <?php
  if (session_status() == PHP_SESSION_NONE) {
    session_start();
  }
  if (isset($_SESSION['login']) && $_SESSION['login'] == 1) { ?>
    <a href="/login/logout.php">Log out</a>
  <?php } else { ?>
    <a href="/login/">Log in</a>
  <?php } ?>
  <a href="<?php echo $_SERVER["REQUEST_URI"];?>">Refresh</a>
  <a href="/">Home</a>
</span>
