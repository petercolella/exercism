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
          const isFirstChar = gridRow[col - 1] === word[0];
          const isLastChar = gridRow[col - 1] === word[word.length - 1];
          if (isFirstChar || isLastChar) {
            const wordFitsToRight = col + len <= gridRow.length;
            const args = { word, row, col, isFirstChar };
            if (wordFitsToRight) {
              if (this.findDirection(args, [0, 1])) return;
            }
            if (wordFitsToBottom) {
              if (this.findDirection(args, [1, 0])) return;
              if (wordFitsToRight) {
                if (this.findDirection(args, [1, 1])) return;
              }
              const wordFitsToLeft = col - len > 0;
              if (wordFitsToLeft) {
                if (this.findDirection(args, [1, -1])) return;
              }
            }
          }
        }
      }
      this.results[word] = undefined;
    });

    return this.results;
  }

  findDirection({ word, row, col, isFirstChar }, direction) {
    const searchedWord = isFirstChar ? word : this.reverseStr(word);
    const location = this.getPotentialFind(row, col, direction, searchedWord);

    if (location) {
      this.results[word] = {
        [isFirstChar ? 'start' : 'end']: [row, col],
        [isFirstChar ? 'end' : 'start']: location
      };
      return true;
    }
    return false;
  }

  getPotentialFind(row, col, direction, searchedWord) {
    let i = 0;
    const [rowIncrement, colIncrement] = direction;
    while (
      this.grid[row - 1 + i * rowIncrement][col - 1 + i * colIncrement] ===
      searchedWord[i]
    ) {
      i++;
      if (i === searchedWord.length) {
        return [row + (i - 1) * rowIncrement, col + (i - 1) * colIncrement];
      }
    }
    return undefined;
  }

  reverseStr(str) {
    return str.split('').reverse().join('');
  }
}

export default WordSearch;
