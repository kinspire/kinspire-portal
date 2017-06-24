<?php
  session_start();

  $success = false;

  if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Check the username and password
    $username = $_POST['username'];
    // $password = $_POST['password'];

    include $_SERVER['DOCUMENT_ROOT'].'/includes/db.php';

    $matches = PDO_FetchAll("SELECT * FROM users WHERE username = :username", array("username"=>$username));
    if (count($matches) == 1) {
      $success = true;
      $_SESSION['user'] = $matches[0];
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
