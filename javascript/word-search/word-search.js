//
// This is only a SKELETON file for the 'Word Search' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

class WordSearch {
  constructor(grid) {
    this.grid = grid;
  }

  find(words) {
    const results = {};
    words.forEach(word => {
      results[word] = undefined;
      const len = word.length;
      this.grid.forEach((row, i) => {
        const rowNum = i + 1;
        const firstLetterIndex = row.indexOf(word[0]);
        if (
          firstLetterIndex !== -1 &&
          row.substring(firstLetterIndex, firstLetterIndex + len) === word
        ) {
          results[word] = {
            start: [rowNum, firstLetterIndex + 1],
            end: [rowNum, firstLetterIndex + len]
          };
        }
      });
    });
    return results;
  }
}

export default WordSearch;
