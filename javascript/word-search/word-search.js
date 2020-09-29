//
// This is only a SKELETON file for the 'Word Search' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

const reverseStr = str => {
  return str.split('').reverse().join('');
};

const findDirection = (
  {
    results,
    word,
    wordLength,
    i,
    row,
    rowNum,
    slicedGrid,
    j,
    colNum,
    isFirstLetter,
    searchedWord
  },
  directionFn
) => {
  let resultsValue;
  switch (directionFn) {
    case 'findHorizontally':
      resultsValue = {
        start: isFirstLetter ? [rowNum, j + 1] : [rowNum, j + wordLength],
        end: isFirstLetter ? [rowNum, j + wordLength] : [rowNum, j + 1]
      };

      if (row.substring(j, j + wordLength) === searchedWord) {
        results[word] = resultsValue;
        return true;
      }
      return false;
    case 'findVertically':
      resultsValue = {
        start: isFirstLetter ? [rowNum, colNum] : [i + wordLength, colNum],
        end: isFirstLetter ? [i + wordLength, colNum] : [rowNum, colNum]
      };

      if (slicedGrid.reduce((str, row) => str + row[j], '') === searchedWord) {
        results[word] = resultsValue;
        return true;
      }
      return false;
    case 'findTopLeftToBottomRight':
      resultsValue = {
        start: isFirstLetter
          ? [rowNum, colNum]
          : [i + wordLength, j + wordLength],
        end: isFirstLetter ? [i + wordLength, j + wordLength] : [rowNum, colNum]
      };

      if (
        slicedGrid.reduce((str, row, index) => str + row[j + index], '') ===
        searchedWord
      ) {
        results[word] = resultsValue;
        return true;
      }
      return false;
    case 'findTopRightToBottomLeft':
      resultsValue = {
        start: isFirstLetter
          ? [rowNum, colNum]
          : [i + wordLength, colNum - wordLength + 1],
        end: isFirstLetter
          ? [i + wordLength, colNum - wordLength + 1]
          : [rowNum, colNum]
      };

      if (
        slicedGrid.reduce((str, row, index) => str + row[j - index], '') ===
        searchedWord
      ) {
        results[word] = resultsValue;
        return true;
      }
      return false;
    default:
      results[word] = undefined;
  }
};

class WordSearch {
  constructor(grid) {
    this.grid = grid;
  }

  find(words) {
    const results = {};
    const grid = this.grid;

    words.forEach(word => {
      results[word] = undefined;
      const wordLength = word.length;
      for (let i = 0; i < grid.length; i++) {
        const row = grid[i];
        const rowNum = i + 1;
        const slicedGrid = grid.slice(i, i + wordLength);
        const wordFitsToBottom = grid.length - i >= wordLength;
        for (let j = 0; j < row.length; j++) {
          const colNum = j + 1;
          const isFirstLetter = row[j] === word[0];
          const isLastLetter = row[j] === word[wordLength - 1];
          if (isFirstLetter || isLastLetter) {
            const searchedWord = isFirstLetter ? word : reverseStr(word);
            const wordFitsToRight = j + wordLength <= row.length;
            const args = {
              results,
              word,
              wordLength,
              i,
              row,
              rowNum,
              slicedGrid,
              j,
              colNum,
              isFirstLetter,
              searchedWord
            };
            if (wordFitsToRight) {
              if (findDirection(args, 'findHorizontally')) return;
            }
            if (wordFitsToBottom) {
              if (findDirection(args, 'findVertically')) return;
              if (wordFitsToRight) {
                if (findDirection(args, 'findTopLeftToBottomRight')) return;
              }
              const wordFitsToLeft = j + 1 - wordLength >= 0;
              if (wordFitsToLeft) {
                if (findDirection(args, 'findTopRightToBottomLeft')) return;
              }
            }
          }
        }
      }
    });

    return results;
  }
}

export default WordSearch;
