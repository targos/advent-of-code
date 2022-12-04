// https://adventofcode.com/2022/day/4

import { readInput } from '../utils.js';

let count = 0;
for await (const { first, second } of readInput(import.meta.url, splitInput)) {
  const firstLength = getRangeLength(first);
  const secondLength = getRangeLength(second);
  const overlap = getOverlap(first, second);
  if (
    overlap &&
    (getRangeLength(overlap) === firstLength ||
      getRangeLength(overlap) === secondLength)
  ) {
    count++;
  }
}
console.log(count);

function getOverlap(first, second) {
  if (first.start > second.start) {
    [first, second] = [second, first];
  }
  if (first.end < second.start) {
    return null;
  }
  return {
    start: Math.max(first.start, second.start),
    end: Math.min(first.end, second.end),
  };
}

function getRangeLength(range) {
  return range.end - range.start + 1;
}

function splitInput(input) {
  const [first, second] = input.split(',');
  return {
    first: splitRange(first),
    second: splitRange(second),
  };
}

function splitRange(range) {
  const [start, end] = range.split('-');
  return { start: Number(start), end: Number(end) };
}
