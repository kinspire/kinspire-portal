<?php
  include $_SERVER['DOCUMENT_ROOT'].'/var/pdo.php';

  session_start();

  $success = false;

  if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Check the username and password
    $username = $_POST['username'];
    $password = $_POST['password'];

    include $_SERVER['DOCUMENT_ROOT'].'/includes/db.php';

    // Switch on login or signup
    if (isset($_POST['signup'])) {
      // TODO: check to see if this user already exists
      PDO_Execute("INSERT INTO users (username, password) VALUES (:username, :password)",
        array("username"=>$username, "password"=>$password));
      $success = true;
    } else if (isset($_POST['login'])) {
      $matches = PDO_FetchAll("SELECT * FROM users WHERE username = :username", array("username"=>$username));
      if (count($matches) == 1) {
        $success = true;
      }
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
