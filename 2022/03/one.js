// https://adventofcode.com/2022/day/3

import { readInput } from '../utils.js';

const aCode = 'a'.charCodeAt(0);
const zCode = 'z'.charCodeAt(0);
const ACode = 'A'.charCodeAt(0);
const ZCode = 'Z'.charCodeAt(0);

const priorities = {};
for (let char = aCode; char <= zCode; char++) {
  priorities[String.fromCharCode(char)] = char - aCode + 1;
}
for (let char = ACode; char <= ZCode; char++) {
  priorities[String.fromCharCode(char)] = char - ACode + 27;
}

let sum = 0;
for await (const [first, second] of readInput(import.meta.url, splitInput)) {
  const firstSet = new Set(first);
  for (const char of second) {
    if (firstSet.has(char)) {
      sum += priorities[char];
      break;
    }
  }
}
console.log(sum);

function splitInput(input) {
  return [input.slice(0, input.length / 2), input.slice(input.length / 2)];
}
