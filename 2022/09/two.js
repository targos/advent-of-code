// https://adventofcode.com/2022/day/9

import { readInput } from '../utils.js';

class Bridge {
  tailVisited = new Set(['0_0']);

  constructor(numKnots) {
    this.knots = Array.from({ length: numKnots }, () => [0, 0]);
  }

  move(inst) {
    for (let i = 0; i < inst.steps; i++) {
      this.#moveOnce(inst.direction);
    }
  }

  #moveOnce(direction) {
    this.#moveKnot(this.knots[0], direction);
    for (let i = 1; i < this.knots.length; i++) {
      this.#checkNextKnot(this.knots[i - 1], this.knots[i]);
    }
    const tail = this.knots.at(-1);
    this.tailVisited.add(`${tail[0]}_${tail[1]}`);
  }

  #moveKnot(knot, direction) {
    switch (direction) {
      case 'U':
        knot[1]++;
        break;
      case 'R':
        knot[0]++;
        break;
      case 'D':
        knot[1]--;
        break;
      case 'L':
        knot[0]--;
        break;
    }
  }

  #checkNextKnot(previous, next) {
    if (distance(previous, next) <= Math.SQRT2) {
      // Close enough. Knot doesn't move.
      return;
    }

    if (previous[0] !== next[0]) {
      this.#moveKnot(next, previous[0] > next[0] ? 'R' : 'L');
    }
    if (previous[1] !== next[1]) {
      this.#moveKnot(next, previous[1] > next[1] ? 'U' : 'D');
    }
  }
}

const bridge = new Bridge(10);

for await (const inst of readInput(import.meta.url, splitInput)) {
  bridge.move(inst);
}

console.log(bridge.tailVisited.size);

function splitInput(input) {
  const [direction, steps] = input.split(' ');
  return { direction, steps: Number(steps) };
}

function distance(a, b) {
  return Math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2);
}
