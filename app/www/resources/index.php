<?php
require $_SERVER['DOCUMENT_ROOT']."/includes/scaffolder.php";
head("Resources", 1);
?>
<div class="portal-body">
  <!-- banner - can be dynamic, changing banner messages, three dots at the bottom -->
  <!--<div class="resources-banner">
    Congratulations! You completed Exercise #1.
  </div>-->
  <div class="resources-categories">
    <div class="resources-category-container">
      <a class="resources-category" href="stories/">
        <div class="resources-category-content">
          <div class="resources-category-text">Stories</div>
        </div>
      </a>
      <a class="resources-category" href="templates/">
        <div class="resources-category-content">
          <div class="resources-category-text">Templates</div>
        </div>
      </a>
    </div>
  </div>
</div>
<?php
tail(array('resources'));
?>