<?php
session_start();
if ((isset($_SESSION['login']) && $_SESSION['login'] != '')) {
  header ("Location: ../");
}
?>
<?php require $_SERVER['DOCUMENT_ROOT']."/includes/scaffolder.php";
head("Signup", 0, 2);
?>
<div class="portal-body">
  <form method="post" action="signup.php">
    <div class="flexbox">
      <span class="form-label">First Name:</span>
      <input type="text" name="firstname" placeholder="First Name" />
    </div>
    <div class="flexbox">
      <span class="form-label">Last Name:</span>
      <input type="text" name="lastname" placeholder="Last Name" />
    </div>
    <button class="signup-button">Sign up!</button>
  </form>
</div>
<?php tail(); ?>