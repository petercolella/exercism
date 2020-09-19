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
    this.grid.forEach((row, i) => {
      const rowNum = i + 1;
      words.forEach(word => {
        results[word] = undefined;
        const firstLetterIndex = row.indexOf(word[0]);
        const len = word.length;
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
