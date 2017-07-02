<?php require $_SERVER['DOCUMENT_ROOT']."/includes/scaffolder.php";

// Get information for title and color
$filename = $_SERVER['DOCUMENT_ROOT'].'/content/stories/details.json';
$stories_json = json_decode(file_get_contents($filename), true);
$story_details = $stories_json[$_GET['id']];
$story_colors = $story_details['colors'];
$story_name = $story_details['name'];
head($story_name, -1, false, $story_colors['primary-color']);

// Retrieve already-solved words
$user = $_SESSION['user'];
$ws_answers = json_decode($user['wordsearch_answers'], true);
// var_dump($ws_answers);
$chosenWords = new ArrayObject();
if (isset($ws_answers[$_GET['id']])) {
  $chosenWords = $ws_answers[$_GET['id']];
} ?>
<div class="portal-body flexbox">
  <style>
    /* TODO: Do better with color assignment */
    .wordsearch-grid {
      border-color: <?php echo $story_colors['primary-color'];?>;
    }

    .wordsearch-letter {
      color: <?php echo $story_colors['primary-color'];?>;
    }

    .wordsearch-word {
      color: <?php echo $story_colors['primary-color'];?>;
    }

    .wordsearch-letter-start {
      background-color: <?php echo $story_colors['secondary-color'];?>;
      color: <?php echo $story_colors['text-color'];?>;
    }

    .wordsearch-letter-completed {
      background-color: <?php echo $story_colors['primary-color'];?>;
      color: <?php echo $story_colors['text-color'];?>;
    }
  </style>
  <div class="wordsearch-grid-area">
    <div class="wordsearch-grid">
      <?php
      $filename = $_SERVER['DOCUMENT_ROOT'].'/content/wordsearch/'.$_GET['id'].'.json';
      $wordsearch_json = json_decode(file_get_contents($filename), true);
      $grid = $wordsearch_json['grid'];
      $words = $wordsearch_json['words'];
      ?>
      <?php foreach ($grid as $rowN => $row) {
      ?>
      <div class="wordsearch-row">
        <?php for ($i = 0; $i < strlen($row); $i++) { ?>
          <div class="wordsearch-letter" id="letter-<?php echo $rowN.'-'.$i;?>"><?php echo $row[$i];?></div>
        <?php } ?>
      </div>
      <?php } ?>
    </div>
  </div>
  <div class="wordsearch-words">
    <?php foreach ($words as $word) {?>
      <div class="wordsearch-word" id="wordsearch-word-<?php echo $word;?>"><?php echo $word;?></div>
    <?php }?>
  </div>
  <form name="wordsearch" action="../submitted/?id=<?php echo $_GET['id'];?>" method="post">
    <input type="hidden" name="chosenWords" id="chosen-words">
    <div class="wordsearch-submit shadow-button">
      <div class="shadow-button-text">
        Submit
      </div>
    </div>
  </form>
</div>
<script>
var grid = <?php echo json_encode($grid);?>;
var words = <?php echo json_encode($words);?>;
var chosenWords = <?php echo json_encode($chosenWords);?>;
</script>
<?php tail(array('wordsearch')); ?>
