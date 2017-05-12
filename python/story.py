import json

STORY_NUMBER = 1
CONTENT_FOLDER = '../app/www/content/stories/' 

def main():
    filename = CONTENT_FOLDER + str(STORY_NUMBER) + '.json'  
    data_file = open(filename, 'r')
    output_file = open(CONTENT_FOLDER + str(STORY_NUMBER) + '.html'

    story_json = json.load(data_file)
    paragraphs = story_json['story']
    for paragraph in paragraphs:
        output_file.write(paragraph)
        output_file.write('<br/><br/')

if __name__ == "__main__":
    main()
