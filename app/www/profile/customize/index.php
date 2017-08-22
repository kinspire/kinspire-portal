<?php require $_SERVER['DOCUMENT_ROOT']."/includes/scaffolder.php";
head('Your Avatar', 4);
$user = $_SESSION['user'];
?>
<div class="portal-body flexbox">
  <div class="profile-avatar">
    <img class="profile-avatar-img" src="/images/avatar/<?php echo $user['avatar'];?>.svg"/>
  </div>
  <span class="portal-body flexbox">
    <span class="boxset">
      <div class = "dropdown">
        <span class="box1">Color</span>
        <div class = "dropdown-content">
          <img class="color-1"src="/images/new purple.png">
          <img class="color-2"src="/images/red.png">
          <img class="color-3"src="/images/yellow.png">
          <img class="color-4"src="/images/blue.png">
        </div>
      </div>
      <div class ="dropdown">
      <span class="box2">Shoes</span>
      <div class="dropdown-content">
        <img class = "shoes-1"src = "/images/Grey Sneakers.png">
        <img class = "shoes-2"src = "/images/Blue Sneakers.png">
        <img class = "shoes-3"src = "/images/Green Sneakers.png">
        <img class = "shoes-4"src = "/images/Orange Sneakers.png">
      </div>
    </div>
    <div class="dropdown">
      <span class="box3">Accessories</span>
      <div class ="dropdown-content">
        <img class = "shirt-1"src = "/images/Blue Shirt.png">
        <img class = "shirt-2"src = "/images/Green Tank.png">
        <img class = "shirt-3"src = "/images/Red Shirt.png">
        <img class = "shirt-4"src = "/images/Grey tank.png">
      </div>
    </div>
    </span>
  </span>
</div>
<?php tail(); ?>
