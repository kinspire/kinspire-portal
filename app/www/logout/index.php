<?php require $_SERVER['DOCUMENT_ROOT']."/includes/logincheck.php";
include $_SERVER['DOCUMENT_ROOT'].'/var/pdo.php';

$_SESSION['login'] = 0;
header("Location: ..");
?>
