window.addEventListener("load", setup);
var c;
var ctx;
var lastTime = performance.now();
var deltaTime = 0;

var w = 10;
var cols, rows;
var grid;
var current;
var stack = [];

function setup() {
  c = document.getElementById("canvas");
  ctx = c.getContext("2d");
  c.width = Math.min(window.innerWidth, 800);
  c.height = Math.min(window.innerHeight, 800);

  cols = Math.floor(c.width / w);
  rows = Math.floor(c.height / w);
  grid = new Array(cols);
  for (var i = 0; i < cols; i++) {
    grid[i] = new Array(rows);
    for (var j = 0; j < rows; j++) {
      grid[i][j] = new Cell(i, j);
    }
  }
  current = grid[0][0];

  requestAnimationFrame(loop);
}

function loop(now) {
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].show();
    }
  }

  current.wall = false;
  var next = current.randomNeighbor();
  if (next != undefined) {
    next.wall = false;
    stack.push(next);
    removeWall(current, next);
    current = next;
  } else if (stack.length > 0) {
    current = stack.pop();
  }

  deltaTime = now - lastTime;
  lastTime = now;
  requestAnimationFrame(loop);
}

function removeWall(a, b) {
  if (a.i - b.i == 2) { // Left
    grid[a.i - 1][a.j].wall = false;
  }
  if (a.i - b.i == -2) { // Right
    grid[a.i + 1][a.j].wall = false;
  }
  if (a.j - b.j == 2) { // Top
    grid[a.i][a.j - 1].wall = false;
  }
  if (a.j - b.j == -2) { // Bottom
    grid[a.i][a.j + 1].wall = false;
  }
}
