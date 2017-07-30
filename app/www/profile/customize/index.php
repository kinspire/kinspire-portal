<?php require $_SERVER['DOCUMENT_ROOT']."/includes/scaffolder.php";
head('Your Avatar', 4); //
?>
<div class="portal-body flexbox">
  <div class="profile-avatar">
    <img class="profile-avatar-img" src="/images/avatar/<?php echo $user['avatar'];?>.svg"/>
  </div>
  <span class="portal-body flexbox">
    <span class="boxset">
      <span class="box">Color</span>
      <span class="box">Shoes</span>
      <span class="box">Accessories</span>
    </span>
  </span>
</div>
<?php tail(); ?>
