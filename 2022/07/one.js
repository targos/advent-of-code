// https://adventofcode.com/2022/day/7

import { readInput } from '../utils.js';

class Dir {
  constructor(parent) {
    this.parent = parent;
    this.children = new Map();
    this.files = new Map();
  }
}

const root = new Dir(null);
let currentDir = root;

for await (const input of readInput(import.meta.url, splitInput)) {
  if (input.kind === 'command') {
    if (input.command === 'cd') {
      const { target } = input;
      if (target === '/') {
        currentDir = root;
      } else if (target === '..') {
        currentDir = currentDir.parent;
      } else {
        currentDir = currentDir.children.get(input.target);
      }
    } else {
      // Ignore ls.
    }
  } else {
    const { type, name } = input;
    if (type === 'dir' && !currentDir.children.has(name)) {
      currentDir.children.set(name, new Dir(currentDir));
    } else if (type === 'file') {
      currentDir.files.set(name, input.size);
    }
  }
}

const dirSizes = new Map();

walk(root, '/');

let totalSize = 0;
for (const size of dirSizes.values()) {
  if (size <= 100000) {
    totalSize += size;
  }
}

console.log(totalSize);

function walk(dir, path) {
  let childrenSizes = 0;
  for (const [name, subDir] of dir.children) {
    childrenSizes += walk(subDir, path + name + '/');
  }
  let fileSizes = 0;
  for (const [name, size] of dir.files) {
    fileSizes += size;
  }
  const totalSize = childrenSizes + fileSizes;
  dirSizes.set(path, totalSize);
  return totalSize;
}

function splitInput(input) {
  if (input.startsWith('$ ')) {
    const command = input.slice(2, 4);
    return {
      kind: 'command',
      command,
      ...(command === 'cd' ? { target: input.slice(5) } : null),
    };
  } else {
    const [typeOrSize, name] = input.split(' ');
    return {
      kind: 'info',
      type: typeOrSize === 'dir' ? 'dir' : 'file',
      name,
      ...(typeOrSize !== 'dir' ? { size: Number(typeOrSize) } : null),
    };
  }
}
