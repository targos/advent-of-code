// https://adventofcode.com/2022/day/8

import { readInput } from '../utils.js';

const matrix = [];

for await (const line of readInput(import.meta.url)) {
  matrix.push(line.split('').map(Number));
}

const rows = matrix.length;
const cols = matrix[0].length;

let bestScore = 0;
for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    const score = getScore(row, col);
    bestScore = Math.max(bestScore, score);
  }
}

console.log(bestScore);

function getScore(treeRow, treeCol) {
  if (
    treeRow === 0 ||
    treeCol === 0 ||
    treeRow === rows - 1 ||
    treeCol === cols - 1
  ) {
    return 0;
  }

  const treeHeight = matrix[treeRow][treeCol];

  let score = 1;

  let seen = 0;

  // top direction
  reset();
  for (let col = treeCol - 1; col >= 0; col--) {
    if (processTree(treeRow, col)) {
      break;
    }
  }

  // bottom direction
  reset();
  for (let col = treeCol + 1; col < cols; col++) {
    if (processTree(treeRow, col)) {
      break;
    }
  }

  // right direction
  reset();
  for (let row = treeRow + 1; row < rows; row++) {
    if (processTree(row, treeCol)) {
      break;
    }
  }

  // left direction
  reset();
  for (let row = treeRow - 1; row >= 0; row--) {
    if (processTree(row, treeCol)) {
      break;
    }
  }

  return score;

  function reset() {
    seen = 0;
  }

  function processTree(row, col) {
    seen++;
    if (
      matrix[row][col] >= treeHeight ||
      row === 0 ||
      col === 0 ||
      row === rows - 1 ||
      col === cols - 1
    ) {
      score *= seen;
      return true;
    }
    return false;
  }
}
