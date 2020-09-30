//
// This is only a SKELETON file for the 'Word Search' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

class WordSearch {
  constructor(grid) {
    this.grid = grid;
    this.results = {};
  }

  reverseStr(str) {
    return str.split('').reverse().join('');
  }

  findDirection(
    {
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
    direction
  ) {
    let resultsValue;
    const resultsKey1 = isFirstLetter ? 'start' : 'end';
    const resultsKey2 = isFirstLetter ? 'end' : 'start';
    switch (direction) {
      case 'horizontal':
        resultsValue = {
          [resultsKey1]: [rowNum, colNum],
          [resultsKey2]: [rowNum, j + wordLength]
        };

        if (row.substring(j, j + wordLength) === searchedWord) {
          this.results[word] = resultsValue;
          return true;
        }
        return false;
      case 'vertical':
        resultsValue = {
          [resultsKey1]: [rowNum, colNum],
          [resultsKey2]: [i + wordLength, colNum]
        };

        if (
          slicedGrid.reduce((str, row) => str + row[j], '') === searchedWord
        ) {
          this.results[word] = resultsValue;
          return true;
        }
        return false;
      case 'topLeftToBottomRight':
        resultsValue = {
          [resultsKey1]: [rowNum, colNum],
          [resultsKey2]: [i + wordLength, j + wordLength]
        };

        if (
          slicedGrid.reduce((str, row, index) => str + row[j + index], '') ===
          searchedWord
        ) {
          this.results[word] = resultsValue;
          return true;
        }
        return false;
      case 'topRightToBottomLeft':
        resultsValue = {
          [resultsKey1]: [rowNum, colNum],
          [resultsKey2]: [i + wordLength, colNum - wordLength + 1]
        };

        if (
          slicedGrid.reduce((str, row, index) => str + row[j - index], '') ===
          searchedWord
        ) {
          this.results[word] = resultsValue;
          return true;
        }
        return false;
      default:
        this.results[word] = undefined;
    }
  }

  find(words) {
    words.forEach(word => {
      const wordLength = word.length;
      for (let i = 0; i < this.grid.length; i++) {
        const row = this.grid[i];
        const rowNum = i + 1;
        const slicedGrid = this.grid.slice(i, i + wordLength);
        const wordFitsToBottom = this.grid.length - i >= wordLength;
        for (let j = 0; j < row.length; j++) {
          const colNum = j + 1;
          const isFirstLetter = row[j] === word[0];
          const isLastLetter = row[j] === word[wordLength - 1];
          if (isFirstLetter || isLastLetter) {
            const searchedWord = isFirstLetter ? word : this.reverseStr(word);
            const wordFitsToRight = j + wordLength <= row.length;
            const args = {
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
              if (this.findDirection(args, 'horizontal')) return;
            }
            if (wordFitsToBottom) {
              if (this.findDirection(args, 'vertical')) return;
              if (wordFitsToRight) {
                if (this.findDirection(args, 'topLeftToBottomRight')) return;
              }
              const wordFitsToLeft = j + 1 - wordLength >= 0;
              if (wordFitsToLeft) {
                if (this.findDirection(args, 'topRightToBottomLeft')) return;
              }
            }
          }
        }
      }
    });

    return this.results;
  }
}

export default WordSearch;
