<?php
echo "helllo";

$STORY_NUMBER = 1;
$CONTENT_FOLDER = 'stories/';

$filename = $CONTENT_FOLDER.$STORY_NUMBER.'.json';
$outputFile = fopen($CONTENT_FOLDER.$STORY_NUMBER.'.html', 'w');
$story_json = json_decode(file_get_contents($filename), true);

$paragraphs = $story_json['story'];

foreach ($paragraphs as $paragraph) {
  // Split into words -- i.e. any non-alphanumeric characters and "-"
  var_dump($paragraph);
  $words = preg_split("\\w+", $paragraph);
  var_dump($words);
  break;
  fwrite($outputFile, $paragraph);
  fwrite($outputFile, '<br/><br/>');
}
?>
