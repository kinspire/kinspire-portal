<?php
  session_start();
  unset($_SESSION['login']);
  unset($_SESSION['user']);
  header("Location: ./");
?>
