// https://adventofcode.com/2022/day/5

import { readInput } from '../utils.js';

class Cargo {
  stacks = [];

  initStacks(length) {
    const numStacks = (length + 1) / 4;
    for (let i = 0; i < numStacks; i++) {
      this.stacks.push([]);
    }
  }

  addLayer(line) {
    if (this.stacks.length === 0) {
      this.initStacks(line.length);
    }
    const layer = parseLayer(line);
    for (const [index, value] of layer.entries()) {
      if (value !== null) {
        this.stacks[index].push(value);
      }
    }
  }

  move({ count, from, to }) {
    const items = this.stacks[from - 1].splice(0, count);
    this.stacks[to - 1].splice(0, 0, ...items);
  }

  getTopLayer() {
    let result = '';
    for (const stack of this.stacks) {
      if (stack.length > 0) {
        result += stack[0];
      }
    }
    return result;
  }
}

const cargo = new Cargo();

// init | move
let state = 'init';

for await (const line of readInput(import.meta.url)) {
  if (state === 'init') {
    if (line === '') {
      state = 'move';
    } else if (!line.includes('[')) {
      // Ignore line with column labels.
      continue;
    } else {
      cargo.addLayer(line);
    }
  } else {
    cargo.move(parseMove(line));
  }
}

console.log(cargo.getTopLayer());

function parseLayer(line) {
  const columns = [];
  for (let index = 0; index < line.length; index += 4) {
    const value = line.slice(index, index + 4).trim();
    if (value === '') {
      columns.push(null);
    } else {
      columns.push(value[1]);
    }
  }
  return columns;
}

function parseMove(line) {
  const {
    groups: { count, from, to },
  } = /move (?<count>\d+) from (?<from>\d+) to (?<to>\d+)/.exec(line);
  return {
    count: Number(count),
    from: Number(from),
    to: Number(to),
  };
}
