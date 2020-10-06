class WordSearch {
  constructor(grid) {
    this.grid = grid;
  }

  find(words) {
    return words.reduce((results, word) => {
      return {
        ...results,
        [word]: this.findEachWord(word)
      };
    }, {});
  }

  findEachWord(word) {
    word = word.split('');
    for (let row = 0; row < this.grid.length; row++) {
      for (let col = 0; col < this.grid[row].length; col++) {
        const isFirstChar = this.grid[row][col] === word[0];
        const isLastChar = this.grid[row][col] === word[word.length - 1];
        if (isFirstChar || isLastChar) {
          const args = { word, row, col, isFirstChar };
          const found = this.checkCharFind(args);
          if (found) return found;
        }
      }
    }
  }

  checkCharFind(args) {
    const { word, row, col } = args;
    const found = deltas => this.checkDirection(args, deltas);

    const fitsRight = col + word.length <= this.grid[row].length;
    if (fitsRight && found([0, 1])) return found([0, 1]);

    const fitsDown = this.grid.length - row >= word.length;
    if (fitsDown) {
      if (found([1, 0])) return found([1, 0]);
      if (fitsRight && found([1, 1])) return found([1, 1]);

      const fitsLeft = col + 1 - word.length >= 0;
      if (fitsLeft && found([1, -1])) return found([1, -1]);
    }
  }

  checkDirection({ word, row, col, isFirstChar }, deltas) {
    const chars = isFirstChar ? word : [...word].reverse();
    const location = this.getPotentialFind(row, col, deltas, chars);

    if (location) {
      return {
        [isFirstChar ? 'start' : 'end']: [row + 1, col + 1],
        [isFirstChar ? 'end' : 'start']: location
      };
    }
  }

  getPotentialFind(row, col, deltas, chars) {
    let i = 1;
    const [rowDelta, colDelta] = deltas;

    while (this.grid[row + i * rowDelta][col + i * colDelta] === chars[i]) {
      if (i === chars.length - 1) {
        return [row + 1 + i * rowDelta, col + 1 + i * colDelta];
      }
      i++;
    }
  }
}

export default WordSearch;
