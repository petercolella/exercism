export class Triangle {
  constructor(n) {
    this.rows = this.populateRows(n);
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
}
