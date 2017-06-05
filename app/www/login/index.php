<?php
session_start();
if ((isset($_SESSION['login']) && $_SESSION['login'] != '')) {
  header ("Location: ../");
}
?>
<?php require $_SERVER['DOCUMENT_ROOT']."/includes/scaffolder.php";
head("Login", 0, true);
?>
<div class="portal-body">
  <div class="login-area">
    <form method="post" action="login.php">
      <input type="text" name="username" placeholder="username" value="test@test.org"/>
      <input type="password" name="password" placeholder="pass" value="test"/>
      <button type="submit" name="login" class="login-button">Log in</button>
      <button type="submit" name="signup" class="login-button">Sign up</button>
    </form>
  </div>
</div>
<?php tail(); ?>