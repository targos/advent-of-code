// https://adventofcode.com/2021/day/1

import { readInput } from '../utils.js';

const numbers = readInput(import.meta.url, Number);

let total = 0;
let previous = numbers[0];
for (let i = 1; i < numbers.length; i++) {
  if (numbers[i] > previous) {
    total++;
  }
  previous = numbers[i];
}

console.log(total);
