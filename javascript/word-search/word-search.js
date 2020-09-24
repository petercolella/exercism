//
// This is only a SKELETON file for the 'Word Search' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

const reverseStr = str => {
  return str.split('').reverse().join('');
};

const checkHorizontally = (results, word, row, rowNum) => {
  const len = word.length;
  const firstLetterIndex = row.indexOf(word[0]);
  const lastLetterIndex = row.indexOf(word[len - 1]);
  if (
    firstLetterIndex !== -1 &&
    row.substring(firstLetterIndex, firstLetterIndex + len) === word
  ) {
    return (results[word] = {
      start: [rowNum, firstLetterIndex + 1],
      end: [rowNum, firstLetterIndex + len]
    });
  }
  if (
    lastLetterIndex !== -1 &&
    row.substring(lastLetterIndex, lastLetterIndex + len) === reverseStr(word)
  ) {
    return (results[word] = {
      start: [rowNum, lastLetterIndex + len],
      end: [rowNum, lastLetterIndex + 1]
    });
  }
};

class WordSearch {
  constructor(grid) {
    this.grid = grid;
  }

  find(words) {
    const results = {};
    const grid = this.grid;
    const gridLen = grid.length;
    words.forEach(word => {
      results[word] = undefined;
      const len = word.length;
      for (let i = 0; i < gridLen; i++) {
        const row = grid[i];
        const rowNum = i + 1;
        checkHorizontally(results, word, row, rowNum);
      }
      if (!results[word]) {
        for (let i = 0; i < gridLen; i++) {
          const row = grid[i];
          const rowNum = i + 1;
          for (let j = 0; j < row.length; j++) {
            const colNum = j + 1;
            // top to bottom
            if (
              gridLen - i >= len &&
              row[j] === word[0] &&
              grid.slice(i, i + len).reduce((str, row) => str + row[j], '') ===
                word
            ) {
              return (results[word] = {
                start: [rowNum, colNum],
                end: [i + len, colNum]
              });
            }
            // bottom to top
            if (
              gridLen - i >= len &&
              row[j] === word[len - 1] &&
              grid.slice(i, i + len).reduce((str, row) => str + row[j], '') ===
                reverseStr(word)
            ) {
              return (results[word] = {
                start: [i + len, colNum],
                end: [rowNum, colNum]
              });
            }
            // top left to bottom right
            if (
              gridLen - i >= len &&
              row[j] === word[0] &&
              grid
                .slice(i, i + len)
                .reduce((str, row, index) => str + row[j + index], '') === word
            ) {
              return (results[word] = {
                start: [rowNum, colNum],
                end: [i + len, j + len]
              });
            }
            // bottom right to top left
            if (
              gridLen - i >= len &&
              row[j] === word[len - 1] &&
              grid
                .slice(i, i + len)
                .reduce((str, row, index) => str + row[j + index], '') ===
                reverseStr(word)
            ) {
              return (results[word] = {
                start: [i + len, j + len],
                end: [rowNum, colNum]
              });
            }
            // bottom left to top right
            if (
              gridLen - i >= len &&
              row[j] === word[len - 1] &&
              grid
                .slice(i, i + len)
                .reduce((str, row, index) => str + row[j - index], '') ===
                reverseStr(word)
            ) {
              return (results[word] = {
                start: [i + len, colNum - len + 1],
                end: [rowNum, colNum]
              });
            }
          }
        }
      }
    });
    return results;
  }
}

export default WordSearch;
