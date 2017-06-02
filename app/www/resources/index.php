<?php
require $_SERVER['DOCUMENT_ROOT']."/includes/scaffolder.php";
head("Resources");
?>
<div class="portal-body">
  <!-- banner - can be dynamic, changing banner messages, three dots at the bottom -->
  <!--<div class="resources-banner">
    Congratulations! You completed Exercise #1.
  </div>-->
  <div class="resources-categories">
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
    <!--<a class="resources-category" href="vocab/">
      <div class="resources-category-content">
        <div class="resources-category-text">Vocabulary</div>
      </div>
    </a>-->
  </div>
</div>
<?php
tail(array('resources'));
?>