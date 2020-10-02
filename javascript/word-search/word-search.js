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
      const wordL = word.length;
      for (let i = 0; i < this.grid.length; i++) {
        const row = this.grid[i];
        const wordFitsToBottom = this.grid.length - i >= wordL;
        for (let j = 0; j < row.length; j++) {
          const isFirstLetter = row[j] === word[0];
          const isLastLetter = row[j] === word[wordL - 1];
          if (isFirstLetter || isLastLetter) {
            const wordFitsToRight = j + wordL <= row.length;
            const args = {
              word,
              wordL,
              i,
              j,
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
              const wordFitsToLeft = j + 1 - wordL >= 0;
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

  findDirection({ word, wordL, i, j, isFirstLetter }, direction) {
    let position;
    const searchedWord = isFirstLetter ? word : this.reverseStr(word);
    const slicedGrid = this.grid.slice(i, i + wordL);

    switch (direction) {
      case 'horizontal':
        if (this.grid[i].substring(j, j + wordL) === searchedWord)
          position = [i + 1, j + wordL];
        break;
      case 'vertical':
        if (this.getPotentialFind(slicedGrid, j, 0) === searchedWord)
          position = [i + wordL, j + 1];
        break;
      case 'topLeftToBottomRight':
        if (this.getPotentialFind(slicedGrid, j, 1) === searchedWord)
          position = [i + wordL, j + wordL];
        break;
      case 'topRightToBottomLeft':
        if (this.getPotentialFind(slicedGrid, j, -1) === searchedWord)
          position = [i + wordL, j + 1 - wordL + 1];
        break;
      default:
        position = false;
    }

    if (position) {
      this.results[word] = {
        [isFirstLetter ? 'start' : 'end']: [i + 1, j + 1],
        [isFirstLetter ? 'end' : 'start']: position
      };
      return true;
    }
    return false;
  }

  getPotentialFind(slicedGrid, j, increment) {
    return slicedGrid.reduce(
      (str, row, index) => str + row[j + index * increment],
      ''
    );
  }

  reverseStr(str) {
    return str.split('').reverse().join('');
  }
}

export default WordSearch;
