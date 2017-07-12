<?php
function head($title, $active_page = -1, $is_login = 0 /* 0 = not login, 1 = login, 2 = signup */, $title_color = null) {
    if (!$is_login) {
        require $_SERVER['DOCUMENT_ROOT']."/includes/logincheck.php";
    } ?>
    <head>
    <?php include $_SERVER['DOCUMENT_ROOT']."/includes/head.php"; ?>
    <title><?php echo $title;?></title>
    </head>
    <body>
        <?php // require $_SERVER['DOCUMENT_ROOT']."/includes/main-menu.php"; ?>
        <div id="portal-content">
            <img id="portal-background-top" src="/images/portal-top-bar.png"/>
            <img id="portal-background-bottom" src="/images/portal-bottom-bar-final-01.png"/>
            <img id="portal-background-left" src="/images/portal-left-bar.png"/>
            <img id="portal-background-right" src="/images/portal-right-bar.png"/>
            <!--<img id="portal-background" src="/images/home-border.png"/>-->
            <div id="portal-header">
                <?php if (!$is_login) { require $_SERVER['DOCUMENT_ROOT']."/includes/menu.php"; menu($active_page); } ?>
                <div class="portal-title"
                    <?php
                    if ($title_color != null) {?>
                        style="color: <?php echo $title_color;?>"
                    <?php } ?>>
                    <?php echo $title;?></div>
                <?php if ($is_login != 1) { require $_SERVER['DOCUMENT_ROOT']."/includes/back.php";} ?>
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