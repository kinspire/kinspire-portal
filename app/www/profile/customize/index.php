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
          <p>option1</p>
          <p>addgreen</p>
          <p>addblue</p>
          <p>addorange</p>
        </div>
      </div>
      <div class ="dropdown">
      <span class="box2">Shoes</span>
      <div class="dropdown-content">
        <img class = "shoes-1"src = "/images/Grey Sneakers.png">
      </div>
    </div>
    <div class="dropdown">
      <span class="box3">Accessories</span>
      <div class ="dropdown-content">
        <p>add4options</p>
      </div>
    </div>
    </span>
  </span>
</div>
<?php tail(); ?>
