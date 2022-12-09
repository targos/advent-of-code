// https://adventofcode.com/2022/day/9

import { readInput } from '../utils.js';

class Bridge {
  head = [0, 0];
  tail = [0, 0];
  tailVisited = new Set(['0_0']);

  move(inst) {
    for (let i = 0; i < inst.steps; i++) {
      this.#moveOnce(inst.direction);
    }
  }

  #moveOnce(direction) {
    this.#moveKnot(this.head, direction);
    this.#checkTail(direction);
    this.tailVisited.add(`${this.tail[0]}_${this.tail[1]}`);
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

  #checkTail() {
    if (distance(this.head, this.tail) <= Math.SQRT2) {
      // Close enough. Tail doesn't move.
      return;
    }

    if (this.head[0] !== this.tail[0]) {
      this.#moveKnot(this.tail, this.head[0] > this.tail[0] ? 'R' : 'L');
    }
    if (this.head[1] !== this.tail[1]) {
      this.#moveKnot(this.tail, this.head[1] > this.tail[1] ? 'U' : 'D');
    }
  }
}

const bridge = new Bridge();

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
