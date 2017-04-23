function stories() {
  window.location = './stories/'
}

// Stories
$("#story-1").click(function() {
  $("#stories-home").fadeOut(function() {
    $("#stories-story").css("display", "flex")
    .hide()
    .fadeIn(function() {
      $("#stories-back").css("display", "inline")
        .hide()
        .fadeIn();
    });
  });
});

$("#stories-back").click(function() {
  $("#stories-home").fadeIn();
  $("#stories-story").fadeOut();
  $("#stories-back").fadeOut();
});
