// https://adventofcode.com/2022/day/8

import { readInput } from '../utils.js';

const matrix = [];

for await (const line of readInput(import.meta.url)) {
  matrix.push(line.split('').map(Number));
}

const visibleTrees = new Set();

const rows = matrix.length;
const cols = matrix[0].length;

let currentHeight = -1;

for (let row = 0; row < rows; row++) {
  resetHeight();
  for (let col = 0; col < cols; col++) {
    processTree(row, col);
  }
  resetHeight();
  for (let col = cols - 1; col >= 0; col--) {
    processTree(row, col);
  }
}

for (let col = 0; col < cols; col++) {
  resetHeight();
  for (let row = 0; row < rows; row++) {
    processTree(row, col);
  }
  resetHeight();
  for (let row = rows - 1; row >= 0; row--) {
    processTree(row, col);
  }
}

console.log(visibleTrees.size);

function resetHeight() {
  currentHeight = -1;
}

function processTree(row, col) {
  const height = matrix[row][col];
  if (height > currentHeight) {
    visibleTrees.add(`${row}_${col}`);
    currentHeight = height;
  }
}
