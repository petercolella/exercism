//
// This is only a SKELETON file for the 'Word Search' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

const reverseStr = str => {
  return str.split('').reverse().join('');
};

const findHorizontally = (results, word, grid, i) => {
  const wordLen = word.length;
  const row = grid[i];
  const rowNum = i + 1;
  const firstLetterIndex = row.indexOf(word[0]);
  if (
    firstLetterIndex !== -1 &&
    firstLetterIndex + wordLen <= row.length &&
    row.substring(firstLetterIndex, firstLetterIndex + wordLen) === word
  ) {
    results[word] = {
      start: [rowNum, firstLetterIndex + 1],
      end: [rowNum, firstLetterIndex + wordLen]
    };
    return true;
  }
  const lastLetterIndex = row.indexOf(word[wordLen - 1]);
  if (
    lastLetterIndex !== -1 &&
    lastLetterIndex + wordLen <= row.length &&
    row.substring(lastLetterIndex, lastLetterIndex + wordLen) ===
      reverseStr(word)
  ) {
    results[word] = {
      start: [rowNum, lastLetterIndex + wordLen],
      end: [rowNum, lastLetterIndex + 1]
    };
    return true;
  }
  return false;
};

const findTopToBottom = (results, word, grid, i, row, j) => {
  const wordLen = word.length;
  const slicedGrid = grid.slice(i, i + wordLen);
  const rowNum = i + 1;
  const colNum = j + 1;
  const start = [rowNum, colNum];
  // top to bottom
  if (slicedGrid.reduce((str, row) => str + row[j], '') === word) {
    results[word] = {
      start,
      end: [i + wordLen, colNum]
    };
    return true;
  }
  // top left to bottom right
  if (
    j + wordLen <= row.length &&
    slicedGrid.reduce((str, row, index) => str + row[j + index], '') === word
  ) {
    results[word] = {
      start,
      end: [i + wordLen, j + wordLen]
    };
    return true;
  }
  // top right to bottom left
  if (
    colNum - wordLen >= 0 &&
    slicedGrid.reduce((str, row, index) => str + row[j - index], '') === word
  ) {
    results[word] = {
      start,
      end: [i + wordLen, colNum - wordLen + 1]
    };
    return true;
  }
  return false;
};

const findBottomToTop = (results, word, grid, i, row, j) => {
  const wordLen = word.length;
  const slicedGrid = grid.slice(i, i + wordLen);
  const rowNum = i + 1;
  const colNum = j + 1;
  const end = [rowNum, colNum];
  const reversedWord = reverseStr(word);
  // bottom to top
  if (slicedGrid.reduce((str, row) => str + row[j], '') === reversedWord) {
    results[word] = {
      start: [i + wordLen, colNum],
      end
    };
    return true;
  }
  // bottom right to top left
  if (
    j + wordLen <= row.length &&
    slicedGrid.reduce((str, row, index) => str + row[j + index], '') ===
      reversedWord
  ) {
    results[word] = {
      start: [i + wordLen, j + wordLen],
      end
    };
    return true;
  }
  // bottom left to top right
  if (
    colNum - wordLen >= 0 &&
    slicedGrid.reduce((str, row, index) => str + row[j - index], '') ===
      reversedWord
  ) {
    results[word] = {
      start: [i + wordLen, colNum - wordLen + 1],
      end
    };
    return true;
  }
  return false;
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
      const wordLen = word.length;
      for (let i = 0; i < gridLen; i++) {
        if (findHorizontally(results, word, grid, i)) return;
        if (gridLen - i >= wordLen) {
          const row = grid[i];
          for (let j = 0; j < row.length; j++) {
            if (row[j] === word[0]) {
              if (findTopToBottom(results, word, grid, i, row, j)) return;
            }
            if (row[j] === word[wordLen - 1]) {
              if (findBottomToTop(results, word, grid, i, row, j)) return;
            }
          }
        }
      }
    });
    return results;
  }
}

export default WordSearch;
