import re
import json

STORY_NUMBER = '1'
CONTENT_FOLDER = 'stories/'

filename = open(CONTENT_FOLDER + STORY_NUMBER + '.json')
story_json = json.load(filename)

outputFile = open(CONTENT_FOLDER + STORY_NUMBER + '.html', 'w');

paragraphs = story_json['story'];
vocab = story_json['vocab'];
i = 0

for paragraph in paragraphs:
    # words = re.split("\W+", paragraph)
    while i < len(vocab):
        parts = paragraph.split(vocab[i], 1)

        outputFile.write(parts[0] + '\n')

        if len(parts) < 2:
            break

        # Write out the vocab word with scaffolding
        outputFile.write('<span class="stories-vocab">\n')
        outputFile.write('\t<span class="stories-vocab-word">' + vocab[i] + '</span>')
        outputFile.write('\t<div class="stories-vocab-def">Definition</div>')
        outputFile.write('</span>')
        i += 1

        paragraph = parts[1]

    # outputFile.write(paragraph);
    outputFile.write('<br/><br/>');
