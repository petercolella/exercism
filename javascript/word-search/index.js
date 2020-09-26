const row = 'ccoffeezlp';
const word = 'coffee';

const letterMatchIndexes = [...row].reduce(
  (arr, char, i) => (char === word[0] ? [...arr, i] : arr),
  []
);

console.log(letterMatchIndexes);

const findHorizontally = (results, word, row, rowNum, isFirstLetter) => {
  const wordLen = word.length;
  const resultsValue = isFirstLetter
    ? {
        start: [rowNum, i + 1],
        end: [rowNum, i + wordLen]
      }
    : {
        start: [rowNum, i + wordLen],
        end: [rowNum, i + 1]
      };
  const searchedWord = isFirstLetter ? word : reverseStr(word);

  if (row.substring(i, i + wordLen) === searchedWord) {
    results[word] = resultsValue;
    return true;
  }
  return false;
};

const findVertically = (
  results,
  word,
  slicedGrid,
  i,
  rowNum,
  j,
  isFirstLetter
) => {
  const wordLen = word.length;
  const colNum = j + 1;
  const start = [rowNum, colNum];
  const end = [rowNum, colNum];
  const resultsValue = isFirstLetter
    ? {
        start,
        end: [i + wordLen, colNum]
      }
    : {
        start: [i + wordLen, colNum],
        end
      };
  const searchedWord = isFirstLetter ? word : reverseStr(word);

  if (slicedGrid.reduce((str, row) => str + row[j], '') === searchedWord) {
    results[word] = resultsValue;
    return true;
  }
  return false;
};

for (let i = 0; i < grid.length; i++) {
  const row = grid[i];
  const slicedGrid = grid.slice(i, i + wordLen);
  const wordFitsToRight = i + wordLen <= row.length;
  const wordFitsToBottom = grid.length - i >= wordLen;
  for (let j = 0; j < row.length; j++) {
    const isFirstLetter = row[j] === word[0];
    const isLastLetter = row[j] === word[wordLen - 1];
    if (isFirstLetter || isLastLetter) {
      if (wordFitsToRight) {
        findHorizontally(results, word, row, rowNum, isFirstLetter);
      }
      if (wordFitsToBottom) {
        findVertically(results, word, slicedGrid, i, rowNum, j, isFirstLetter);
        if (wordFitsToRightm) {
          // top left to bottom right \
        }
        const wordFitsToLeft = j + 1 - wordLen >= 0;
        if (wordFitsToLeft) {
          // top right to bottom left /
        }
      }
    }
  }
}
