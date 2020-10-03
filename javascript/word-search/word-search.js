//
// This is only a SKELETON file for the 'Word Search' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

class WordSearch {
  constructor(grid) {
    this.grid = grid;
    this.results = {};
  }

  find(words) {
    words.forEach(word => {
      const len = word.length - 1;
      for (let row = 1; row <= this.grid.length; row++) {
        const gridRow = this.grid[row - 1];
        const wordFitsToBottom = this.grid.length - row >= len;
        for (let col = 1; col <= gridRow.length; col++) {
          const isFirstLetter = gridRow[col - 1] === word[0];
          const isLastLetter = gridRow[col - 1] === word[word.length - 1];
          if (isFirstLetter || isLastLetter) {
            const wordFitsToRight = col + len <= gridRow.length;
            const args = {
              word,
              len,
              row,
              col,
              isFirstLetter
            };
            if (wordFitsToRight) {
              if (this.findDirection(args, 'horizontal')) return;
            }
            if (wordFitsToBottom) {
              if (this.findDirection(args, 'vertical')) return;
              if (wordFitsToRight) {
                if (this.findDirection(args, 'topLeftToBottomRight')) return;
              }
              const wordFitsToLeft = col - len > 0;
              if (wordFitsToLeft) {
                if (this.findDirection(args, 'topRightToBottomLeft')) return;
              }
            }
          }
        }
      }
      this.results[word] = undefined;
    });

    return this.results;
  }

  findDirection({ word, len, row, col, isFirstLetter }, direction) {
    let location = false;
    const searchedWord = isFirstLetter ? word : this.reverseStr(word);
    const slicedGrid = this.grid.slice(row - 1, row + len);

    switch (direction) {
      case 'horizontal':
        if (this.grid[row - 1].substring(col - 1, col + len) === searchedWord)
          location = [row, col + len];
        break;
      case 'vertical':
        if (this.getPotentialFind(slicedGrid, col, 0) === searchedWord)
          location = [row + len, col];
        break;
      case 'topLeftToBottomRight':
        if (this.getPotentialFind(slicedGrid, col, 1) === searchedWord)
          location = [row + len, col + len];
        break;
      case 'topRightToBottomLeft':
        if (this.getPotentialFind(slicedGrid, col, -1) === searchedWord)
          location = [row + len, col - len];
        break;
      default:
        return;
    }

    if (location) {
      this.results[word] = {
        [isFirstLetter ? 'start' : 'end']: [row, col],
        [isFirstLetter ? 'end' : 'start']: location
      };
      return true;
    }
    return false;
  }

  getPotentialFind(slicedGrid, col, increment) {
    return slicedGrid.reduce(
      (str, gridRow, index) => str + gridRow[col - 1 + index * increment],
      ''
    );
  }

  reverseStr(str) {
    return str.split('').reverse().join('');
  }
}

export default WordSearch;
