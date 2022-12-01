// https://adventofcode.com/2022/day/1

import { readInput } from '../utils.js';

let biggestTotal = 0;
let currentTotal = 0;

for await (const value of readInput(import.meta.url)) {
  if (value === '') {
    biggestTotal = Math.max(biggestTotal, currentTotal);
    currentTotal = 0;
  } else {
    currentTotal += Number(value);
  }
}

biggestTotal = Math.max(biggestTotal, currentTotal);

console.log(biggestTotal);
