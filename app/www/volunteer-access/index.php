<head>
  <?php require $_SERVER['DOCUMENT_ROOT']."/includes/style.php"; ?>
  <title>Volunteer Access</title>
</head>
<body>
  <?php require $_SERVER['DOCUMENT_ROOT']."/includes/header.php"; ?>
  <div class="portal-content">
    <div class="portal-header">Volunteer Access</div>
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
    <?php require $_SERVER['DOCUMENT_ROOT']."/includes/menu.php";?>
  </div>
  <?php require $_SERVER['DOCUMENT_ROOT']."/includes/footer.php"; ?>
</body>
