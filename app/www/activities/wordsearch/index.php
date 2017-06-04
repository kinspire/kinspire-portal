<?php require $_SERVER['DOCUMENT_ROOT']."/includes/scaffolder.php";
head("Word Search", 2);
?>
<div class="portal-body">
  <div class="resources-categories">
    <div class="resources-category-container">
    <?php 
    // $filename = $_SERVER['DOCUMENT_ROOT'].'/content/stories/details.json';
    // $stories_json = json_decode(file_get_contents($filename), true);
    // foreach ($stories_json as $id => $details) {
    ?>
    <div class="activities-category">
      <div class="resources-category-content">
        <a class="resources-category-text" href="play/?id=1">Level 1</a>
      </div>
    </div>
    <div class="activities-category">
      <div class="resources-category-content">
        <a class="resources-category-text" href="play/?id=2">Level 2</a>
      </div>
    </div>
  </div>
</div>
<?php tail(); ?>
