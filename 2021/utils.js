import { readFileSync } from 'node:fs';

export function readInput(url, transform) {
  return readFileSync(new URL('input.txt', url), 'utf-8')
    .split('\n')
    .map((value) => transform(value));
}
