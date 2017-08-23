<?php require $_SERVER['DOCUMENT_ROOT']."/includes/scaffolder.php";
head('Profile', 4);

$user = $_SESSION['user'];

// Birthday
$birthday_str = $user['birthday']; // "Birthday str";

// Class level
$number = $user['class_level'];
$ends = array('th','st','nd','rd','th','th','th','th','th','th');
if (($number %100) >= 11 && ($number%100) <= 13)
   $abbreviation = $number. 'th';
else
   $abbreviation = $number. $ends[$number % 10];
$class_ord = $abbreviation;
?>
<div class="portal-body flexbox">
  <div class="profile-avatar">
    <img class="profile-avatar-img" src="/images/avatar/<?php echo $user['avatar'];?>.svg"/>
  <a href="profile/customize/"><div class="customize">CUSTOMIZE ME!</div></a>
  </div>
  <div class="profile-details">
    <div>Hello,
      <span class="profile-detail"><?php echo $user['name'];?>!</span>
      <!-- <input type="text" name="firstname"><input type="text" name="lastname"> -->
    </div>
    <div>Your birthday is on: <span class="profile-detail"><?php echo $birthday_str;?></span></div>
    <div>You are in <span class="profile-detail"><?php echo $class_ord;?></span> class.<p></p><p></p></div>
    <div class= "profile-progress">
      <div><p></p>Check out your progress!</div>
    </div>
  </div>
</div>
<?php tail(); ?>
