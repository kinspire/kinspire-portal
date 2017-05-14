<?php
$STORY_NUMBER = 1;
$CONTENT_FOLDER = 'stories/';

$filename = $CONTENT_FOLDER.$STORY_NUMBER.'.json';
$outputFile = fopen($CONTENT_FOLDER.$STORY_NUMBER.'.html', 'w');
$story_json = json_decode(file_get_contents($filename), true);

$paragraphs = $story_json['story'];

foreach ($paragraphs as $paragraph) {
  fwrite($outputFile, $paragraph);
  fwrite($outputFile, '<br/><br/>');
}
?>
