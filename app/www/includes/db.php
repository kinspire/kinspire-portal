<?php

//TODO: this should be run once since PDO is global
$db_file = $_SERVER['DOCUMENT_ROOT'].'/db/users.sqlite3';
PDO_Connect("sqlite:$db_file");

// PDO_Execute("CREATE TABLE users (
//   email VARCHAR(100),
//   password VARCHAR(100),
//   reg_date TIMESTAMP
// )");

?>
