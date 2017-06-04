<?php
function head($title, $active = 0) {
    require $_SERVER['DOCUMENT_ROOT']."/includes/logincheck.php"; ?>
    <head>
    <?php include $_SERVER['DOCUMENT_ROOT']."/includes/head.php"; ?>
    <title><?php echo $title;?></title>
    </head>
    <body>
        <?php require $_SERVER['DOCUMENT_ROOT']."/includes/main-menu.php"; ?>
        <div id="portal-content">
            <img id="portal-background" src="/images/home-border.png"/>
            <div id="portal-header">
                <?php require $_SERVER['DOCUMENT_ROOT']."/includes/menu.php";menu($active);?>
                <div class="portal-title"><?php echo $title;?></div>
                <?php require $_SERVER['DOCUMENT_ROOT']."/includes/back.php";?>
            </div>
<?php }

function tail($js_files = array()) { ?>
        </div>
        <?php require $_SERVER['DOCUMENT_ROOT']."/includes/footer.php";?>
        <?php
        foreach ($js_files as $js_file) {
            echo '<script src="/js/'.$js_file.'.js"></script>';
        }
        ?>
    </body>
<?php }
?>