<?php
require $_SERVER['DOCUMENT_ROOT']."/includes/scaffolder.php";
head("Stories", -1);
?>
<div class="portal-body">
    <div class="resources-categories">
        <div class="resources-category-container">
        <?php 
        require $_SERVER['DOCUMENT_ROOT'].'/includes/db.php';

        $filename = $_SERVER['DOCUMENT_ROOT'].'/content/stories/details.json';
        $stories_json = json_decode(file_get_contents($filename), true);

        $id = 0;
        $user = $_SESSION['user'];
        $current_level = $user['difficulty_level'];

        // Check to see that we have resources for the current level
        if (isset($stories_json[$current_level])) {
            $level_json = $stories_json[$current_level];

            // Fetch current story level from `resources` table
            $next_story = PDO_FetchOne("SELECT stories_num FROM learning_resources WHERE student_id = :student_id", array("student_id" => $user["student_id"]));

            $activities_available = false;
            for ($id = 0; $id <= $next_story; $id++) {
                if (isset($level_json[$id])) { 
                    $activities_available = true;
                    $details = $level_json[$id];
                    ?>
            <div class="resources-category">
                <?php if ($id == $next_story) { ?>
                <div class="resources-category-content" style="background-color: <?php echo $details['colors']['secondary-color']; ?>;">
                <?php } else { ?>
                <div class="resources-category-content-done">
                <?php } ?>
                <a class="resources-category-text" href="story/?level=<?php echo $current_level;?>&id=<?php echo $id;?>"><?php echo $details["name"];?></a>
                </div>
            </div>
        <?php } 
        }
    }
    if (!$activities_available) { ?>
        <div class="filler">
            No activities available!
        </div>
    <?php } ?>
    </div>
  </div>
</div>
<?php tail(array("resources")); ?>
