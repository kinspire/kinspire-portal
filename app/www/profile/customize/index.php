<?php require $_SERVER['DOCUMENT_ROOT']."/includes/scaffolder.php";
head('Your Avatar', 4); //
?>
<div class="portal-body flexbox">
  <div class="profile-avatar">
    <img class="profile-avatar-img" src="/images/avatar/<?php echo $user['avatar'];?>.svg"/>
  </div>
  <span class="portal-body flexbox">
    <span class="boxset">
      <span class="box1">Color
        <div class ="dropdown">
          <button class="dropdown-content"
          <div class="dropdown-content">
          <a href = #Pink>Pink</a>
        </div>
      </div>
    </span>
      <span class="box2">Shoes
        <div class ="dropdown">
          <button class="dropdown-content"
          <div class="dropdown-content">
          <a href ="google.com">Pink</a>
        </div>
      </div>
    </span>
      <span class="box3">Accessories
        <div class ="dropdown">
          <button class="dropdown-content"
          <div class="dropdown-content">
          <a href ="google.com">Pink</a>
        </div>
      </div>
     </span>
    </span>
  </span>
</div>
<?php tail(); ?>
