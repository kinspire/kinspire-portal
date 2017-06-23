<?php require $_SERVER['DOCUMENT_ROOT']."/includes/scaffolder.php";
head("Word Search ".$_GET['id'], -1); ?>
<div class="portal-body flexbox">
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
  <div class="wordsearch-words">
    <?php foreach ($words as $word) {?>
      <div id="wordsearch-word-<?php echo $word;?>"><?php echo $word;?></div>
    <?php }?>
  </div>
</div>
<script>
var grid = <?php echo json_encode($grid);?>;
var words = <?php echo json_encode($words);?>;
</script>
<?php tail(array('wordsearch')); ?>
