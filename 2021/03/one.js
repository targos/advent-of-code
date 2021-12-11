// https://adventofcode.com/2021/day/3

import { readInput } from '../utils.js';

const input = readInput(import.meta.url, (value) => value.split(''));

const bitLength = input[0].length;

let gammaRateBits = '';
let epsilonRateBits = '';
for (let bit = 0; bit < bitLength; bit++) {
  let on = 0;
  let off = 0;
  for (const value of input) {
    value[bit] === '1' ? on++ : off++;
  }
  if (on > off) {
    gammaRateBits += '1';
    epsilonRateBits += '0';
  } else {
    gammaRateBits += '0';
    epsilonRateBits += '1';
  }
}

const gammaRate = parseInt(gammaRateBits, 2);
const epsilonRate = parseInt(epsilonRateBits, 2);

console.log({ gammaRate, epsilonRate });
console.log(gammaRate * epsilonRate);
