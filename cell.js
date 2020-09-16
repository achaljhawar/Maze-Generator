class Cell {
  constructor(i, j) {
    this.i = i;
    this.j = j;
    this.wall = true;
  }

  show() {
    if (this == current) {
      ctx.fillStyle = "rgb(255, 0, 0)";
    } else if (this.wall) {
      ctx.fillStyle = "rgb(0, 0, 0)";
    } else {
      ctx.fillStyle = "rgb(255, 255, 255)";
    }
    ctx.fillRect(this.i * w, this.j * w, w, w);
  }

  randomNeighbor() {
    var neighbors = [];

    if (this.i > 1 && grid[this.i - 2][this.j].wall) neighbors.push(grid[this.i - 2][this.j]);
    if (this.i < cols - 2 && grid[this.i + 2][this.j].wall) neighbors.push(grid[this.i + 2][this.j]);
    if (this.j > 1 && grid[this.i][this.j - 2].wall) neighbors.push(grid[this.i][this.j - 2]);
    if (this.j < rows - 2 && grid[this.i][this.j + 2].wall) neighbors.push(grid[this.i][this.j + 2]);

    if (neighbors.length > 0) {
      var index = Math.floor(Math.random() * neighbors.length);
      return neighbors[index];
    }
    return undefined;
  }
}
