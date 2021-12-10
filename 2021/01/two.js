// https://adventofcode.com/2021/day/1#part2

import { readInput } from '../utils.js';

const numbers = readInput(import.meta.url, Number);

let total = 0;
let previous = numbers[0] + numbers[1] + numbers[2];
for (let i = 1; i < numbers.length - 2; i++) {
  let current = numbers[i] + numbers[i + 1] + numbers[i + 2];
  if (current > previous) {
    total++;
  }
  previous = current;
}

console.log(total);
