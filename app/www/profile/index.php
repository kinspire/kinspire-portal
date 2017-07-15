<?php require $_SERVER['DOCUMENT_ROOT']."/includes/scaffolder.php"; 
head('Profile', 4);

$user = $_SESSION['user'];
?>
<div class="portal-body flexbox">
  <div class="profile-avatar">
    <img class="profile-avatar-img" src="/images/avatar/<?php echo $user['avatar'];?>.svg"/>
  </div>
  <div class="profile-details">
    <div>Name:<span class="profile-detail"><?php echo $user['name'];?></span></div>
    <div>Birthday:<span class="profile-detail"><?php echo $user['birthday'];?></span></div>
    <div>Class Level: <span class="profile-detail"><?php echo $user['class_level'];?></span></div>
  </div>
</div>
<?php tail(); ?>