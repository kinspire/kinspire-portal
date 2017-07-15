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
  <form method="post" action="signup.php" name="signup">
    <div class="flexbox">
      <span class="form-label">First Name:</span>
      <input type="text" name="firstname" placeholder="First Name" />
    </div>
    <div class="flexbox">
      <span class="form-label">Last Name:</span>
      <input type="text" name="lastname" placeholder="Last Name" />
    </div>
    <div class="flexbox">
      <span class="form-label">Birthday:</span>
      <input type="date" name="birthday"/>
    </div>
    <div class="flexbox">
      <span class="form-label">Class Level:</span>
      <input type="number" name="class-level" placeholder="Class Level" />
    </div>
    <div class="signup-avatars">
      <?php
      $directory = ($_SERVER['DOCUMENT_ROOT']."/images/avatar");
      $files = array_diff(scandir($directory), array('..', '.'));

      foreach ($files as $file) {
        $name = trim(substr($file, 0, strlen($file) - 4)); ?>
        <div class="signup-avatar-container">
          <img class="signup-avatar" id="avatar-img-<?php echo $name;?>" src="/images/avatar/<?php echo $file; ?>">
          <input class="signup-avatar-radio" type="radio" name="avatar"
id="avatar-<?php echo $name; ?>" value="avatar-<?php echo $name; ?>">
        </div>
      <?php }
      ?>
    </div>
    <div class="signup-button">Sign up!</div>
  </form>
</div>
<?php tail(array("signup")); ?>