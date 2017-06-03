<?php require $_SERVER['DOCUMENT_ROOT']."/includes/scaffolder.php";
head("Activities", 2);
?>
<div class="portal-body">
  <!-- banner - can be dynamic, changing banner messages, three dots at the bottom -->
  <!--<div class="resources-banner">
    Congratulations! You completed Exercise #1.
  </div>-->
  <div class="resources-categories">
    <div class="resources-category-container">
      <a class="activities-category" href="wordsearch/">
        <div class="resources-category-content">
          <div class="resources-category-text">Word Search</div>
        </div>
      </a>
      <a class="activities-category" href="crosswords/">
        <div class="resources-category-content">
          <div class="resources-category-text">Crosswords</div>
        </div>
      </a>
    </div>
  </div>
</div>
<?php
tail(array('resources'));
?>