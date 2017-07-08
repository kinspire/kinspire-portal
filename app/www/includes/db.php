<?php
include $_SERVER['DOCUMENT_ROOT'].'/var/pdo.php';
$db_file = $_SERVER['DOCUMENT_ROOT'].'/db/portal.sqlite3';
PDO_Connect("sqlite:$db_file");
?>
