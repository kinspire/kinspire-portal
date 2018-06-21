export default {
  getDefaultContentProgress
};

function getDefaultContentProgress(id) {
  // TODO design?
  return {
    user_id: id,
    crossword_num: 0,
    wordsearch_num: 0,
    stories_num: 0
  };
}
