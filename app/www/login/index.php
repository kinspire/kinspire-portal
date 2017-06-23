<?php
session_start();
if ((isset($_SESSION['login']) && $_SESSION['login'] != '')) {
  header ("Location: ../");
}
?>
<?php require $_SERVER['DOCUMENT_ROOT']."/includes/scaffolder.php";
head("Login", 0, true);
?>
<div class="portal-body flexbox">
  <a class="first-time" href="/signup/">
    <div class="first-time-text">
      First time?
    </div>
  </a>
  <div class="login-area">
    <div class="login-title">Welcome back!</div>
    <form method="post" action="login.php">
      <input class="login-textbox" type="text" name="username" placeholder="username" value="test"/>
      <!--<input type="password" name="password" placeholder="pass" value="test"/>-->
      <button class="login-button" type="submit" name="login" >Log in</button>
      <!--<button type="submit" name="signup" class="login-button">Sign up</button>-->
    </form>
  </div>
</div>
<?php tail(); ?>