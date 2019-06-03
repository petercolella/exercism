export class Triangle {
  constructor(n) {
    this.rows = this.populateRowsRecursive(n);
    this.lastRow = this.rows[n - 1];
  }

  populateRows(n) {
    let rows = [];
    for (let i = 1; i <= n; i++) {
      let previousRow = rows[i - 2];
      let currentRow = [];
      if (previousRow) {
        for (let j = 0; j < i; j++) {
          currentRow.push((previousRow[j - 1] || 0) + (previousRow[j] || 0));
        }
      } else {
        currentRow.push(i);
      }
      rows.push(currentRow);
    }
    return rows;
  }

  populateRowsRecursive(n, rows = [[1]]) {
    if (n <= 1) {
      return rows.slice(0, n);
    } else {
      let currentRow = [];
      let previousRow = rows[rows.length - 1];
      for (let i = 0; i < n; i++) {
        currentRow.push((previousRow[i - 1] || 0) + (previousRow[i] || 0));
      }
      rows.push(currentRow);
      return this.populateRowsRecursive(n - 1, rows);
    }
  }
}
