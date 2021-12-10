// https://adventofcode.com/2021/day/2

import { readInput } from '../utils.js';

const input = readInput(import.meta.url, (value) => {
  const values = value.split(' ');
  return { direction: values[0], amount: Number(values[1]) };
});

let position = 0;
let depth = 0;

for (const { direction, amount } of input) {
  switch (direction) {
    case 'forward':
      position += amount;
      break;
    case 'down':
      depth += amount;
      break;
    case 'up':
      depth -= amount;
      break;
  }
}

console.log({ position, depth });
console.log(position * depth);
