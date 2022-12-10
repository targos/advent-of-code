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

let sum = 0;
const cpu = new CPU({
  onCycle(cpu) {
    if (cpu.cycles === 20 || (cpu.cycles - 20) % 40 === 0) {
      sum += cpu.cycles * cpu.X;
    }
  },
});

for await (const instruction of readInput(import.meta.url, splitInput)) {
  cpu.executeInstruction(instruction);
}

console.log(sum);

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
