<head>
  <?php require $_SERVER['DOCUMENT_ROOT']."/includes/style.php"; ?>
  <title>Portal</title>
</head>
<body>
  <?php require $_SERVER['DOCUMENT_ROOT']."/includes/header.php"; ?>
  <div class="portal-content">
    <div class="portal-header">
      <span style="color:purple;">P</span><span style="color:lime;">O</span><span style="color:aqua;">R</span><span style="color:red;">T</span><span style="color:orange;">A</span><span style="color:lightcoral;">L</span>
    </div>
    <div class="portal-body">
      <div class="portal-section col-md-4">Miscellaneous</div>
      <div class="portal-section col-md-4">Next Activity to Try</div>
      <div class="portal-section col-md-4">Your Progress</div>
    </div>
    <div class="portal-menu">
      <div class="portal-menu-title" id="menu-title">Menu</div>
      <div class="portal-menu-content" id="menu-content">
        <div><a href="/resources/">Learning Resources</a></div>
        <div>Activities</div>
        <div>Volunteer Access</div>
        <div>Profile</div>
        <div>Contact</div>
      </div>
    </div>
  </div>
  <?php require "/includes/footer.php"; ?>
</body>
