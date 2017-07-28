<?php
  session_start();

  $success = false;

  if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Check the username and password
    $username = strtolower($_POST['username']);

    require $_SERVER['DOCUMENT_ROOT'].'/includes/db.php';

    $matches = PDO_FetchAll("SELECT * FROM users WHERE username = :username", array("username"=>$username));
    if (count($matches) == 1) {
      $_SESSION['user'] = $matches[0];
      $success = true;
    }
  }

  // Default case
  if ($success) {
    $_SESSION['login'] = 1;
    header("Location: ../");
  } else {
    $_SESSION['login'] = 0;
    header("Location: .");
  }
?>
