#!/c/Python27/python

import io
import json

STORY_NUMBER = '1'
CONTENT_FOLDER = 'app/www/content/stories/'


def main():
    '''
    Main routine
    '''
    filename = io.open(CONTENT_FOLDER + STORY_NUMBER +
                       '.json', 'r', encoding='utf8')
    story_json = json.load(filename)

    generate_story(story_json)


def generate_story(story_json):
    '''
    Creates the story HTML to be injected into the stories page from the respective JSON files.
    '''
    output_file = io.open(CONTENT_FOLDER + STORY_NUMBER +
                          '.html', 'w', encoding='utf8')

    paragraphs = story_json['story']
    vocab = story_json['vocab']
    translations = story_json['translation-te']
    i = 0

    for paragraph in paragraphs:
        # words = re.split("\W+", paragraph)
        while i < len(vocab):
            parts = paragraph.split(vocab[i], 1)

            output_file.write(parts[0] + '\n')

            if len(parts) < 2:
                break

            # Write out the vocab word with scaffolding
            output_file.write(u'<span class="stories-vocab">\n')
            output_file.write(
                u'\t<span class="stories-vocab-word">' + vocab[i] + u'</span>')
            output_file.write(u'\t<div class="stories-vocab-def">' + (
                translations[i] if i < len(translations) else '[translation]') + u'</div>')
            output_file.write(u'</span>')
            i += 1

            paragraph = parts[1]

        if i == len(vocab):
            output_file.write(paragraph + '\n')

        # outputFile.write(paragraph)
        output_file.write(u'<br/><br/>')


def generate_questions(story_json):
    '''
    Generates the questions HTML from the various json files.
    '''
    output_file = io.open(
        '{0}story-{1}.html'.format(CONTENT_FOLDER, STORY_NUMBER), 'w', encoding='utf8')

    paragraphs = story_json['story']
    vocab = story_json['vocab']
    translations = story_json['translation-te']
    i = 0

    for paragraph in paragraphs:
        # words = re.split("\W+", paragraph)
        while i < len(vocab):
            parts = paragraph.split(vocab[i], 1)

            output_file.write(parts[0] + '\n')

            if len(parts) < 2:
                break

            # Write out the vocab word with scaffolding
            output_file.write(u'<span class="stories-vocab">\n')
            output_file.write(
                u'\t<span class="stories-vocab-word">' + vocab[i] + u'</span>')
            output_file.write(u'\t<div class="stories-vocab-def">' + (
                translations[i] if i < len(translations) else '[translation]') + u'</div>')
            output_file.write(u'</span>')
            i += 1

            paragraph = parts[1]

        if i == len(vocab):
            output_file.write(paragraph + '\n')

        # outputFile.write(paragraph)
        output_file.write(u'<br/><br/>')
    pass


if __name__ == "__main__":
    main()
