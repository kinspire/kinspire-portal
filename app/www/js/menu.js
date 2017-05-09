$("#menu-title").click(function() {
  $("#menu-content").toggle();
});

$(document).on('click', function(event) {
  if (!$(event.target).closest('.portal-menu').length) {
    $("#menu-content").hide();
  }
});
