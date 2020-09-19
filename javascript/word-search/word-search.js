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
      words.forEach((word, j) => {
        results[word] = undefined;
        for (let k = 0; k < word.length; k++) {
          const rowIndex = row.indexOf(word[k]);
          if (rowIndex !== -1) {
            if (k === 0) {
              results[word] = { start: [i + 1, rowIndex + 1] };
            } else if (k === word.length - 1) {
              results[word].end = [i + 1, rowIndex + 1];
            }
          } else {
            return;
          }
        }
      });
    });
    return results;
  }
}

export default WordSearch;
