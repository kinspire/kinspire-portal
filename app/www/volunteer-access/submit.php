<?php
require $_SERVER['DOCUMENT_ROOT']."/includes/scaffolder.php";
head('Volunteer Access', 3);

require $_SERVER['DOCUMENT_ROOT']."/includes/db.php";
$user = $_SESSION["user"];
$vol_str = PDO_FetchOne("SELECT vol_questions FROM users WHERE username = :username",
  array("username" => $user['username']));
$vol_questions = json_decode($vol_str, TRUE);

array_push($vol_questions, $_POST["question"]);
PDO_Execute("UPDATE users SET vol_questions=:vol_questions WHERE username=:username",
  array('vol_questions' => json_encode($vol_questions), 'username' => $user['username']));
?>
<div class="portal-body">
  <div class="filler">
    A volunteer will get back to you soon!
  </div>
</div>
<?php tail(); ?>
