<?php
  include $_SERVER['DOCUMENT_ROOT'].'/var/pdo.php';

  session_start();

  $success = false;

  if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Check the username and password
    $email = $_POST['email'];
    $password = $_POST['password'];

    include $_SERVER['DOCUMENT_ROOT'].'/includes/db.php';

    // Switch on login or signup
    if (isset($_POST['signup'])) {
      PDO_Execute("INSERT INTO users (email, password) VALUES (:email, :password)",
        array("email"=>$email, "password"=>$password));
      $success = true;
    } else if (isset($_POST['login'])) {
      $matches = PDO_FetchAll("SELECT * FROM users WHERE email = :email", array("email"=>$email));
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
