// https://adventofcode.com/2021/day/2#part2

import { readInput } from '../utils.js';

const input = readInput(import.meta.url, (value) => {
  const values = value.split(' ');
  return { direction: values[0], amount: Number(values[1]) };
});

let aim = 0;
let position = 0;
let depth = 0;

for (const { direction, amount } of input) {
  switch (direction) {
    case 'forward':
      position += amount;
      depth += aim * amount;
      break;
    case 'down':
      aim += amount;
      break;
    case 'up':
      aim -= amount;
      break;
  }
}

console.log({ position, depth, aim });
console.log(position * depth);
