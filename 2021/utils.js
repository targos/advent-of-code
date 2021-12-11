import { readFileSync } from 'node:fs';

export function readInput(url, transform) {
  return readFileSync(new URL(getInputFile(), url), 'utf-8')
    .split('\n')
    .map((value) => transform(value));
}

function getInputFile() {
  return process.argv.includes('train') ? 'train.txt' : 'input.txt';
}
