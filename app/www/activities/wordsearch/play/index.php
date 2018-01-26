<?php require $_SERVER['DOCUMENT_ROOT']."/includes/scaffolder.php";

if (!isset($_GET['level']) || !isset($_GET['id'])) {
    header("Location: ..");
    return;
}

// Get information for title and color from the details.json
$filename = $_SERVER['DOCUMENT_ROOT'].'/content/stories/details.json';
$stories_json = json_decode(file_get_contents($filename), true);

$level_details = $stories_json[$_GET['level']];
$story_details = $level_details[$_GET['id']];
$story_colors = $story_details['colors'];
$story_name = $story_details['name'];
head($story_name, -1, false, $story_colors['primary-color']);

$user = $_SESSION['user'];

require $_SERVER['DOCUMENT_ROOT']."/includes/db.php";

// Retrieve already-solved words from the db
$chosenWords = array();
if ($result = PDO_FetchOne("SELECT answers FROM activities_statistics WHERE student_id = :student_id AND level = :level AND activity_num = :a_num", array("student_id" => $user["student_id"], "level" => $_GET['level'], "a_num" => $_GET['id']))) {
    $chosenWords = json_decode($result);
} else {
    $chosenWords = array();
}
?>
<div class="portal-body">
    <style>
        /* TODO: Do better with color assignment */
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
    <div class="flexbox">
        <div class="wordsearch-grid-area">
            <?php
            // Load the word search details and load them into the DOM
            $filename = $_SERVER['DOCUMENT_ROOT'].'/content/wordsearch/'.$_GET['level'].'-'.$_GET['id'].'.json';
            $wordsearch_json = json_decode(file_get_contents($filename), true);
            $grid = $wordsearch_json['grid'];
            ?>
            <?php foreach ($grid as $rowN => $row) { ?>
                <div class="wordsearch-row">
                    <?php for ($i = 0; $i < strlen($row); $i++) { ?>
                        <div class="wordsearch-letter" id="letter-<?php echo $rowN.'-'.$i;?>"><?php echo $row[$i];?></div>
                    <?php } ?>
                </div>
            <?php } ?>
        </div>
        <div class="wordsearch-words">
            <?php
            $words = $wordsearch_json['words'];
            foreach ($words as $word) { ?>
                <div class="wordsearch-word" id="wordsearch-word-<?php echo $word;?>"><?php echo $word;?></div>
            <?php } ?>
        </div>
    </div>
    <form name="wordsearch" action="../submitted/?level=<?php echo $_GET['level'];?>&id=<?php echo $_GET['id'];?>" method="post">
        <input type="hidden" name="chosenWords" id="chosen-words">
        <div class="wordsearch-submit shadow-button">
            <div class="shadow-button-text">
                Submit
            </div>
        </div>
    </form>
</div>
<script>
    // Passing variables into PHP
    var grid = <?php echo json_encode($grid);?>;
    var words = <?php echo json_encode($words);?>;
    var chosenWords = <?php echo json_encode($chosenWords, JSON_FORCE_OBJECT);?>;
</script>
<?php tail(array('wordsearch')); ?>
