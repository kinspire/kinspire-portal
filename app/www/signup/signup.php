<?php
  session_start();

  $success = false;

  if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Check the first and last names
    $first = $_POST['firstname'];
    $last = $_POST['lastname'];

    // TODO: sanitize and check for empty

    $username = str_replace(" ", "", strtolower($first.$last));

    require $_SERVER['DOCUMENT_ROOT'].'/includes/db.php';

    // check to see if this user already exists
    $userN = 0;
    $userToTest = $username;
    while (true) {
      if ($userN != 0) {
        $userToTest = $username.$userN;
      }
      $matches = PDO_FetchAll("SELECT * FROM users WHERE username = :username", array("username"=>$userToTest));
      if (count($matches) != 0) {
        $userN++;
      } else {
        $username = $userToTest;
        break;
      }
    }

    // TODO: add more fields
    PDO_Execute("INSERT INTO users (username, name) VALUES (:username, :name)",
      array("username"=>$username, "name"=>($first." ".$last)));
 
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
