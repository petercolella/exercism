class WordSearch {
  constructor(grid) {
    this.grid = grid;
    this.results = {};
  }

  find(words) {
    words.forEach(word => {
      this.results[word] = this.findEachWord(word);
    });

    return this.results;
  }

  findEachWord(word) {
    for (let row = 0; row < this.grid.length; row++) {
      for (let col = 0; col < this.grid[row].length; col++) {
        const isFirstChar = this.grid[row][col] === word[0];
        const isLastChar = this.grid[row][col] === word[word.length - 1];
        if (isFirstChar || isLastChar) {
          const args = { word, row, col, isFirstChar };
          if (this.checkCharFind(args)) return this.checkCharFind(args);
        }
      }
    }
  }

  checkCharFind(args) {
    const { word, row, col } = args;
    const wordFitsToRight = col + word.length <= this.grid[row].length;
    if (wordFitsToRight) {
      if (this.findDirection(args, [0, 1]))
        return this.findDirection(args, [0, 1]);
    }
    const wordFitsToBottom = this.grid.length - row >= word.length;
    if (wordFitsToBottom) {
      if (this.findDirection(args, [1, 0]))
        return this.findDirection(args, [1, 0]);
      if (wordFitsToRight) {
        if (this.findDirection(args, [1, 1]))
          return this.findDirection(args, [1, 1]);
      }
      const wordFitsToLeft = col - word.length - 1 >= 0;
      if (wordFitsToLeft) {
        if (this.findDirection(args, [1, -1]))
          return this.findDirection(args, [1, -1]);
      }
    }
  }

  findDirection({ word, row, col, isFirstChar }, direction) {
    const searchedWord = isFirstChar ? word : this.reverseStr(word);
    const location = this.getPotentialFind(row, col, direction, searchedWord);

    if (location) {
      return {
        [isFirstChar ? 'start' : 'end']: [row + 1, col + 1],
        [isFirstChar ? 'end' : 'start']: location
      };
    }
  }

  getPotentialFind(row, col, direction, searchedWord) {
    let i = 1;
    const [rowIncrement, colIncrement] = direction;

    while (
      this.grid[row + i * rowIncrement][col + i * colIncrement] ===
      searchedWord[i]
    ) {
      i++;
      if (i === searchedWord.length) {
        return [
          row + 1 + (i - 1) * rowIncrement,
          col + 1 + (i - 1) * colIncrement
        ];
      }
    }
  }

  reverseStr(str) {
    return str.split('').reverse().join('');
  }
}

export default WordSearch;
