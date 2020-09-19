export class Triangle {
  constructor(n) {
    this.rows = this.populateRows(n);
    this.lastRow = this.rows[n - 1];
  }

  populateRows(n, rows) {
    if (!rows) rows = [[1]].slice(0, n);
    if (n <= 1) return rows;

    const currentRow = [];
    const previousRow = rows[rows.length - 1];

    for (let i = 0; i < previousRow.length + 1; i++) {
      currentRow.push((previousRow[i - 1] || 0) + (previousRow[i] || 0));
    }

    rows.push(currentRow);

    return this.populateRows(n - 1, rows);
  }
}
