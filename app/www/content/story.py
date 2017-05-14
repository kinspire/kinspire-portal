import json

STORY_NUMBER = '1'
CONTENT_FOLDER = 'stories/'

filename = open(CONTENT_FOLDER + STORY_NUMBER + '.json')
story_json = json.load(filename)

outputFile = open(CONTENT_FOLDER + STORY_NUMBER + '.html', 'w');

paragraphs = story_json['story'];

for paragraph in paragraphs:
  outputFile.write(paragraph);
  outputFile.write('<br/>BREAK<br/>');
