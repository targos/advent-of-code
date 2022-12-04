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
for await (const [one, two, three] of readByThree()) {
  const first = new Set(one);
  const second = new Set(two);
  const third = new Set(three);
  for (const char of first) {
    if (second.has(char) && third.has(char)) {
      sum += priorities[char];
    }
  }
}
console.log(sum);

async function* readByThree() {
  let group = [];
  for await (const line of readInput(import.meta.url)) {
    group.push(line);
    if (group.length === 3) {
      yield group;
      group = [];
    }
  }
}
