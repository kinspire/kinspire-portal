<?php require $_SERVER['DOCUMENT_ROOT']."/includes/scaffolder.php";
// TODO: read in JSON file for other story information such as title
$filename = $_SERVER['DOCUMENT_ROOT'].'/content/stories/details.json';
$stories_json = json_decode(file_get_contents($filename), true);
$story_details = $stories_json[$_GET['id']];
$story_colors = $story_details['colors'];
$story_name = $story_details['name'];
head($story_name, 1, false, $story_colors['primary-color']);
?>
<div class="portal-body flexbox">
  <style>
    .stories-story-text {
      color: <?php echo $story_colors['text-color'];?>;
    }

    .stories-story-section {
      border-color: <?php echo $story_colors['primary-color'];?>;
    }

    .stories-story-section-story {
      background-color: <?php echo $story_colors['secondary-color'];?>;
    }

    .stories-story-section::-webkit-scrollbar-thumb {
      background-color: <?php echo $story_colors['primary-color'];?>;
    }

    .stories-story-section-questions {
      color: <?php echo $story_colors['primary-color'];?>;
    }

    .stories-vocab-word {
      color: <?php echo $story_colors['highlight-color'];?>;
    }
  </style>
  <div class="stories-story">
    <div class="stories-story-section stories-story-section-story">
      <?php
      require $_SERVER['DOCUMENT_ROOT'].'/content/stories/story-'.$_GET['id'].'.html';
      ?>
    </div>
    <div class="stories-story-section stories-story-section-questions">
      Questions
      <form action="submit.php">
        <ol type="1">
          <?php require $_SERVER['DOCUMENT_ROOT'].'/content/stories/questions-'.$_GET['id'].'.html';?>
        </ol>
        <input type="submit" value="Submit!">
      </form>
    </div>
  </div>
</div>
<?php tail(array('resources')); ?>
