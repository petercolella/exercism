class WordSearch {
  constructor(grid) {
    this.grid = grid.map(row => row.split(''));
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
    const firstChar = word[0];
    const lastChar = word[word.length - 1];
    for (let row = 0; row < this.grid.length; row++) {
      const currentRow = this.grid[row];
      for (let col = 0; col < currentRow.length; col++) {
        const isFirstChar = currentRow[col] === firstChar;
        const isLastChar = currentRow[col] === lastChar;
        if (isFirstChar || isLastChar) {
          const found = this.findEachChar({ word, row, col, isFirstChar });
          if (found) return found;
        }
      }
    }
  }

  findEachChar(args) {
    const { word, row, col } = args;
    const isFound = deltas => this.searchDirection(args, deltas);

    const fitsRight = col + word.length <= this.grid[row].length;
    if (fitsRight && isFound([0, 1])) return isFound([0, 1]);

    const fitsDown = this.grid.length - row >= word.length;
    if (fitsDown) {
      if (isFound([1, 0])) return isFound([1, 0]);
      if (fitsRight && isFound([1, 1])) return isFound([1, 1]);

      const fitsLeft = col + 1 - word.length >= 0;
      if (fitsLeft && isFound([1, -1])) return isFound([1, -1]);
    }
  }

  searchDirection({ word, row, col, isFirstChar }, deltas) {
    const chars = isFirstChar ? word : [...word].reverse();
    const location = this.getLocation(row, col, deltas, chars);

    if (location) {
      return {
        [isFirstChar ? 'start' : 'end']: [row + 1, col + 1],
        [isFirstChar ? 'end' : 'start']: location
      };
    }
  }

  getLocation(row, col, deltas, chars) {
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
