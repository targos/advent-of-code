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

const totalUsedSize = dirSizes.get('/');
const unusedSpace = 70000000 - totalUsedSize;
const sizeToReclaim = 30000000 - unusedSpace;

const sortedDirs = Array.from(dirSizes).sort((dir1, dir2) => dir1[1] - dir2[1]);

for (const [name, size] of sortedDirs) {
  if (size >= sizeToReclaim) {
    console.log(name, size);
    break;
  }
}

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
