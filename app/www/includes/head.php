<link rel="stylesheet" href="/styles/bootstrap.min.css" type="text/css"/>
<?php
require $_SERVER["DOCUMENT_ROOT"]."/includes/lessc.inc.php";
$less = new lessc;
$less->compileFile($_SERVER["DOCUMENT_ROOT"]."/styles/style.less", $_SERVER["DOCUMENT_ROOT"]."/styles/style.css");
?>
<link rel="stylesheet" href="/styles/style.css" type="text/css"/>
