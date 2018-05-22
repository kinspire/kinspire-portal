/*
 * Creates a JSX object for the story from the given object.
 */
export function generateStory(storyNumber) {
  let storyJson = require(`../content/stories/${storyNumber}.json`);

  let paragraphs = storyJson['story'];
  let vocab = storyJson['vocab'];
  let translations = storyJson['translation-te'];
  let i = 0;

  return paragraphs.map((paragraph) => {
    let paragraphContent = [];

    while (i < vocab.length) {
      let parts = paragraph.split(vocab[i], 1);
      paragraphContent.push(
        <span className="stories-story-text">{parts[0]}</span>
      );

      if (parts.length < 2) break;

      // Write out the vocab word

      paragraphContent.push(vocabWord);

      i++;
      paragraph = parts[1];
    }

    if (i == vocab.length) { // sanity check
      // Fencepost for last word
      paragraphContent.push(
        <span className="stories-story-text">{paragraph}</span>
      )
    }

    return (
      <div className="stories-story-paragraph">
        {paragraphContent}
      </div>
    );
  });
}