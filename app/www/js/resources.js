function stories() {
  window.location = './stories/'
}

// Stories
$("#story-1").click(function() {
  $("#stories-home").fadeOut();
  $("#stories-story").css("display", "flex")
    .hide()
    .fadeIn();
  $("#stories-back").css("display", "inline")
    .hide()
    .fadeIn();
});

$("#stories-back").click(function() {
  $("#stories-home").fadeIn();
  $("#stories-story").fadeOut();
  $("#stories-back").fadeOut();
});
