<head>
  <?php require $_SERVER['DOCUMENT_ROOT']."/includes/head.php"; ?>
  <title>Volunteer Access</title>
</head>
<body>
  <?php require $_SERVER['DOCUMENT_ROOT']."/includes/main-menu.php"; ?>
  <div class="portal-content">
    <div class="portal-header">
      <div class="portal-title">Volunteer Access</div>
      <?php require $_SERVER['DOCUMENT_ROOT']."/includes/menu.php";?>
      <?php require $_SERVER['DOCUMENT_ROOT']."/includes/back.php";?>
    </div>
    <div class="portal-body">
      <div class="volunteer-access-question">
        <textarea class="volunteer-access-text" rows="5" placeholder="Type your question here"></textarea>
      </div>
      <div class="volunteer-access-comments">
        <textarea class="volunteer-access-text" rows="3" placeholder="Additional comments"></textarea>
      </div>
      <div class="volunteer-access-submit-area">
        <div class="volunteer-access-file">Add a file</div>
        <div class="volunteer-access-submit">Submit</div>
      </div>
    </div>

  </div>
  <?php require $_SERVER['DOCUMENT_ROOT']."/includes/footer.php"; ?>
</body>
