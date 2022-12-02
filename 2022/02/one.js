// https://adventofcode.com/2022/day/2

import { readInput } from '../utils.js';

const rock = 'rock';
const paper = 'paper';
const scissors = 'scissors';

const win = 'win';
const lose = 'lose';
const draw = 'draw';

const playMapping = {
  A: rock,
  B: paper,
  C: scissors,
  X: rock,
  Y: paper,
  Z: scissors,
};

// Outcomes by opponent move -> player move
const outcomes = {
  rock: {
    rock: draw,
    paper: win,
    scissors: lose,
  },
  paper: {
    rock: lose,
    paper: draw,
    scissors: win,
  },
  scissors: {
    rock: win,
    paper: lose,
    scissors: draw,
  },
};

const shapeScores = {
  rock: 1,
  paper: 2,
  scissors: 3,
};

const outcomeScores = {
  lose: 0,
  draw: 3,
  win: 6,
};

let total = 0;
for await (const round of readInput(import.meta.url, splitInput)) {
  total += getRoundScore(round);
}
console.log(total);

function splitInput(input) {
  const values = input.split(' ');
  return {
    player: playMapping[values[1]],
    opponent: playMapping[values[0]],
  };
}

function getOutcome(round) {
  return outcomes[round.opponent][round.player];
}

function getRoundScore(round) {
  const shapeScore = shapeScores[round.player];
  const outcomeScore = outcomeScores[getOutcome(round)];
  return shapeScore + outcomeScore;
}
