<?php
require $_SERVER['DOCUMENT_ROOT']."/includes/scaffolder.php";
head("Stories", 1);
?>
<div class="portal-body flexbox">
  <div class="resources-categories">
    <div class="resources-category-container">
    <?php 
    $filename = $_SERVER['DOCUMENT_ROOT'].'/content/stories/details.json';
    $stories_json = json_decode(file_get_contents($filename), true);
    foreach ($stories_json as $id => $details) {
    ?>
    <div class="resources-subcategory">
      <div class="resources-category-content">
        <a class="resources-category-text" href="story/?id=<?php echo $id;?>"><?php echo $details["name"];?></a>
      </div>
    </div>
    <?php } ?>
    </div>
  </div>
</div>
<?php
tail(array("resources"));
?>
