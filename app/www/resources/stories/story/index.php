<?php require $_SERVER['DOCUMENT_ROOT']."/includes/logincheck.php"; ?>
<head>
  <?php include $_SERVER['DOCUMENT_ROOT']."/includes/head.php"; ?>
  <title>Story</title>
</head>
<body>
  <?php require $_SERVER['DOCUMENT_ROOT']."/includes/main-menu.php"; ?>
  <?php
  // TODO: read in JSON file for other story information such as title
  ?>
  <div id="portal-content">
    <img id="portal-background" src="/images/home-border.png"/>
    <div id="portal-header">
      <div class="portal-title">Story</div>
      <?php require $_SERVER['DOCUMENT_ROOT']."/includes/menu.php";?>
      <?php require $_SERVER['DOCUMENT_ROOT']."/includes/back.php";?>
    </div>
    <div class="portal-body flexbox">
      <div class="stories-story">
        <div class="stories-story-section">
          <div class="stories-story-text">
            <?php
            require $_SERVER['DOCUMENT_ROOT'].'/content/stories/'.$_GET['id'].'.html';
            ?>
          </div>
        </div>
        <div class="stories-story-section">
          Questions
          <ol type="1">
            <li>Why did the coach make Gopi do push-ups?</li>
            <ol type="a">
              <li><a href = "#"><span>Gopi went to class late</span></a></li>
              <li><a href = "#"><span>Gopi yawned</span></a></li>
              <li><a href = "#"><span>Gopi cried</span></a></li>
              <li><a href = "#"><span>Gopi didn't listen to the teacher</span></a></li>
            </ol>
            <li>Where did everyone go for the big meeting? State the line #.</li>
              <form action="/action_page.php">
                <input type="text" name="firstname">
            <li>Who did Gopi become good friends with?</li>
              <form action="/action_page.php">
                <input type="text" name="firstname">
            <li>Why was Priya crying near the locker rooms?</li>
              <form action="/action_page.php">
                <input type="text" name="firstname">
            <li>What do you remember from your first day of school? Explain in two sentences</li>
              <form action="/action_page.php">
                <input type="text" name="firstname">
          </ol>
          <center><button type="button">Submit!</button></center>
        </div>
      </div>
    </div>
  </div>
  <?php require $_SERVER['DOCUMENT_ROOT']."/includes/footer.php"; ?>
  <script src="/js/resources.js"></script>
</body>
