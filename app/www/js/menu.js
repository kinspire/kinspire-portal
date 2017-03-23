document.getElementById('menu-title').onclick = function onClickHandler() {
  var menuContent = document.getElementById('menu-content').style;
  if (menuContent.visibility === 'visible') {
    menuContent.visibility = 'hidden';
  } else {
    menuContent.visibility = 'visible';
  }
}
