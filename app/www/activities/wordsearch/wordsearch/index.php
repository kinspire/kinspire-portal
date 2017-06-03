<?php require $_SERVER['DOCUMENT_ROOT']."/includes/scaffolder.php";
head("Word Search woo", 2); ?>
<div class="portal-body flexbox">
  <div class="wordsearch-grid">
    <?php
    $filename = $_SERVER['DOCUMENT_ROOT'].'/content/wordsearch/1.json';
    $wordsearch_json = json_decode(file_get_contents($filename), true);
    $grid = $wordsearch_json['grid'];
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
  <div class="wordsearch-words">Words</div>
</div>
<script>
var grid = <?php echo json_encode($wordsearch_json['grid']);?>;
var words = <?php echo json_encode($wordsearch_json['words']);?>;
</script>
<?php tail(array('wordsearch')); ?>
