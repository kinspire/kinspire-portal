<?php
require $_SERVER['DOCUMENT_ROOT']."/includes/scaffolder.php";
head("Stories", -1);
?>
<div class="portal-body">
  <div class="resources-categories">
    <div class="resources-category-container">
    <?php 
    $filename = $_SERVER['DOCUMENT_ROOT'].'/content/stories/details.json';
    $stories_json = json_decode(file_get_contents($filename), true);

    // TODO: change only to the ones available
    //foreach ($stories_json as $id => $details) {
    $id = 0;
    $user = $_SESSION['user'];
    $next_story = $user['next_story'];
    $activities_available = false;
    for ($id = 0; $id <= $next_story; $id++) { 
      if (isset($stories_json[$id])) { 
        $activities_available = true;
        $details = $stories_json[$id];
        ?>
        <div class="resources-category">
          <div class="resources-category-content"
          <?php if ($id == $next_story) { ?>
            style="background-color: <?php echo $details['colors']['secondary-color']; ?>;" <?php } ?>>
            <a class="resources-category-text" href="story/?id=<?php echo $id;?>"><?php echo $details["name"];?></a>
          </div>
        </div>
      <?php } 
    }
    if (!$activities_available) { ?>
      <div class="filler">
        No activities available!
      </div>
    <?php } ?>
    </div>
  </div>
</div>
<?php
tail(array("resources"));
?>
