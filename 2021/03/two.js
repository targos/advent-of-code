// https://adventofcode.com/2021/day/3#part2

import { readInput } from '../utils.js';

const input = readInput(import.meta.url, (value) => value.split(''));

const bitLength = input[0].length;

let filtered1 = input;
let found1;
let filtered2 = input;
let found2;

for (let bit = 0; bit < bitLength; bit++) {
  function isOn(value) {
    return value[bit] === '1';
  }

  function isOff(value) {
    return value[bit] === '0';
  }

  let on1 = 0;
  let off1 = 0;
  for (const value of filtered1) {
    isOn(value) ? on1++ : off1++;
  }

  let on2 = 0;
  let off2 = 0;
  for (const value of filtered2) {
    isOn(value) ? on2++ : off2++;
  }

  if (on1 >= off1) {
    filtered1 = filtered1.filter(isOn);
  } else {
    filtered1 = filtered1.filter(isOff);
  }

  if (on2 >= off2) {
    filtered2 = filtered2.filter(isOff);
  } else {
    filtered2 = filtered2.filter(isOn);
  }

  if (!found1 && filtered1.length === 1) {
    found1 = filtered1[0];
  }
  if (!found2 && filtered2.length === 1) {
    found2 = filtered2[0];
  }

  console.log({ filtered1, filtered2 });
}

const oxygenGeneratorRating = parseInt(found1.join(''), 2);
const CO2ScrubberRating = parseInt(found2.join(''), 2);

console.log({ oxygenGeneratorRating, CO2ScrubberRating });
console.log(oxygenGeneratorRating * CO2ScrubberRating);
