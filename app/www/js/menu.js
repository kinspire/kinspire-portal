$("#menu-title").click(function() {
  $("#menu-content").toggle();
  if ($("#menu-magnet").attr("src").includes("inactive")) {
    $("#menu-magnet").attr("src", "/images/owl-magnet-active.png");
  } else {
    $("#menu-magnet").attr("src", "/images/owl-magnet-inactive.png");
  }
});

$(document).on('click', function(event) {
  if (!$(event.target).closest('.portal-menu').length) {
    $("#menu-magnet").attr("src", "/images/owl-magnet-inactive.png");
    $("#menu-content").hide();
  }
});
