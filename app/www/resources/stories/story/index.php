<?php require $_SERVER['DOCUMENT_ROOT']."/includes/scaffolder.php";
if (!isset($_GET['id'])) { // Need a story
  header("Location: ../");
  return;
}
// TODO: read in JSON file for other story information such as title
$filename = $_SERVER['DOCUMENT_ROOT'].'/content/stories/details.json';
$stories_json = json_decode(file_get_contents($filename), true);
$story_details = $stories_json[$_GET['id']];
$story_colors = $story_details['colors'];
$story_name = $story_details['name'];
head($story_name, -1, false, $story_colors['primary-color']);
?>
<div class="portal-body flexbox">
  <style>
    .stories-story-text {
      color: <?php echo $story_colors['text-color'];?>;
    }

    .stories-story {
      border-color: <?php echo $story_colors['primary-color'];?>;
    }

    .stories-story-section-story {
      background-color: <?php echo $story_colors['secondary-color'];?>;
    }

    .stories-story-section::-webkit-scrollbar-thumb {
      background-color: <?php echo $story_colors['primary-color'];?>;
    }
    
    .stories-story-divider {
      background-color: <?php echo $story_colors['primary-color'];?>;
    }

    .stories-story-section-questions {
      color: <?php echo $story_colors['primary-color'];?>;
    }

    .stories-story-section-questions-title {
      color: <?php echo $story_colors['primary-color'];?>;
    }

    .stories-story-section-questions label {
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
    <div class="stories-story-divider"></div>
    <!-- Two classes needed for the special color style for the scrollbar -->
    <div class="stories-story-section stories-story-section-questions">
      <div class="stories-story-section-questions-title">Questions</div>
      <form action="../submitted/?id=<?php echo $_GET['id'];?>" method="post" name="story-answers">
        <ol type="1">
          <?php require $_SERVER['DOCUMENT_ROOT'].'/content/stories/questions-'.$_GET['id'].'.html';?>
        </ol>
        <input type="button" value="Submit!" id="submit-answers">
        <div id="error"></div>
      </form>
    </div>
  </div>
</div>
<?php tail(array('resources', 'story')); ?>
