// https://adventofcode.com/2022/day/10

import { readInput } from '../utils.js';

const jobs = {
  noop: {
    cycles: 1,
    effect: () => null,
  },
  addx: {
    cycles: 2,
    effect: (cpu, value) => (cpu.X += value),
  },
};

class CPU {
  cycles = 0;
  X = 1;

  constructor({ onCycle }) {
    this.onCycle = onCycle;
  }

  executeInstruction(instruction) {
    const job = jobs[instruction.code];
    for (let i = 0; i < job.cycles; i++) {
      this.cycles++;
      this.onCycle(this);
    }
    job.effect(this, instruction.value);
  }
}

class Screen {
  constructor(cols, rows) {
    this.cols = cols;
    this.rows = rows;
    this.currentRow = 0;
    this.currentCol = 0;
    this.lines = Array.from({ length: this.rows }, () =>
      Array(this.cols).fill('.'),
    );
  }

  drawPixel(spritePosition) {
    if (
      this.currentCol >= spritePosition - 1 &&
      this.currentCol <= spritePosition + 1
    ) {
      this.lines[this.currentRow][this.currentCol] = '#';
    } else {
      this.lines[this.currentRow][this.currentCol] = '.';
    }
    this.currentCol++;
    if (this.currentCol === this.cols) {
      this.currentCol = 0;
      this.currentRow++;
      if (this.currentRow === this.rows) {
        this.currentRow = 0;
      }
    }
  }

  toString() {
    return this.lines.map((line) => line.join('')).join('\n');
  }
}

const screen = new Screen(40, 6);

const cpu = new CPU({
  onCycle(cpu) {
    screen.drawPixel(cpu.X);
  },
});

for await (const instruction of readInput(import.meta.url, splitInput)) {
  cpu.executeInstruction(instruction);
}

console.log(screen.toString());

function splitInput(input) {
  if (input === 'noop') {
    return { code: 'noop' };
  } else {
    const [code, value] = input.split(' ');
    return {
      code,
      value: Number(value),
    };
  }
}
