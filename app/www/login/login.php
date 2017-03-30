<?php
  session_start();
  $_SESSION['login'] = 1;
  header("Location: ../");
?>
