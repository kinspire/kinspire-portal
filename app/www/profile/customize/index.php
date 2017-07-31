<?php require $_SERVER['DOCUMENT_ROOT']."/includes/scaffolder.php";
head('Your Avatar', 4); //
?>
<div class="portal-body flexbox">
  <div class="profile-avatar">
    <img class="profile-avatar-img" src="/images/avatar/<?php echo $user['avatar'];?>.svg"/>
  </div>
  <span class="portal-body flexbox">
    <span class="boxset">
      <span class="box1">Color</span>
      <span class="box2">Shoes</span>
      <span class="box3">Accessories</span>
    </span>
  </span>
</div>
<?php tail(); ?>
