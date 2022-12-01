// https://adventofcode.com/2022/day/1

import { readInput } from '../utils.js';

const calories = [];

for await (const value of readInput(import.meta.url)) {
  if (value === '') {
    calories.push(0);
  } else {
    calories[calories.length - 1] += Number(value);
  }
}

calories.sort((a, b) => b - a);

console.log(calories.slice(0, 3).reduce((c, v) => c + v, 0));
