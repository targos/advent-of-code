// https://adventofcode.com/2022/day/6

import { readInput } from '../utils.js';

for await (const line of readInput(import.meta.url)) {
  console.log(processStream(line));
}

function processStream(line) {
  for (let index = 0; index < line.length; index++) {
    if (new Set(line.slice(index, index + 4)).size === 4) {
      return index + 4;
    }
  }
}
