#!/c/Python27/python

import io
import json
import collections

# TODO: update this to be all files in details
STORY_NUMBERS = 3
CONTENT_FOLDER = 'app/www/content/stories/'


def main():
    '''
    Main routine
    '''
    i = 1
    while i <= STORY_NUMBERS:
        handle_story(i)
        i += 1


def handle_story(i):
    filename = io.open(CONTENT_FOLDER + str(i) +
                       '.json', 'r', encoding='utf8')
    story_json = json.load(filename, object_pairs_hook=collections.OrderedDict)

    generate_story(i, story_json)
    generate_questions(i, story_json)


def generate_story(story_num, story_json):
    '''
    Creates the story HTML to be injected into the stories page from the respective JSON files.
    '''
    output_file = io.open(
        '{0}story-{1}.html'.format(CONTENT_FOLDER, str(story_num)), 'w', encoding='utf8')

    paragraphs = story_json['story']
    vocab = story_json['vocab']
    translations = story_json['translation-te']
    i = 0

    for paragraph in paragraphs:
        output_file.write(u'<div class="stories-story-paragraph">')
        while i < len(vocab):
            parts = paragraph.split(vocab[i], 1)

            output_file.write(
                u'<span class="stories-story-text">{0}</span>\n'.format(parts[0]))

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
            output_file.write(
                u'<span class="stories-story-text">{0}</span>\n'.format(paragraph))

        output_file.write(u'</div><br/>')


def generate_questions(story_num, story_json):
    '''
    Generates the questions HTML from the various json files.
    '''
    output_file = io.open(
        '{0}questions-{1}.html'.format(CONTENT_FOLDER, str(story_num)), 'w', encoding='utf8')

    questions = story_json['questions']

    for question in questions:
        question_num = question['number']
        output_file.write(u'<li>{0}</li>'.format(question['question']))

        if question['type'] == 'mcq':
            for j, choice in enumerate(question['choices']):
                output_file.write(
                    (
                        u'<div class="radio"><label>' +
                        u'<input type="radio" name="question-{0}" id="question-{0}" value="question-{0}-{1}">{2}' +
# u'<input id="q{0}a{1}" type="radio" name="optradio">' +
# u'<label class="flexbox" for="q{0}a{1}"><span id="outside"></span><span id="inside"></span>{2}</label>' +
                        u'</label></div>'
                    ).format(question_num, j, choice)
                )
        elif question['type'] == 'short':
            output_file.write(
                u'<input type="text" name="question-{0}" id="question-{0}">'.format(question_num)
            )
        elif question['type'] == 'long':
            output_file.write(
                u'<textarea name="question-{0}" id="question-{0}"></textarea>'.format(question_num)
            )


if __name__ == "__main__":
    main()
