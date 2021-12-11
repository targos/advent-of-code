// https://adventofcode.com/2021/day/4#part2

import { readInput } from '../utils.js';

const input = readInput(import.meta.url, String);

const numbers = input[0].split(',').map(Number);

const boards = [];
for (let i = 1; i < input.length; i++) {
  if (input[i] === '') {
    boards.push(parseBoard(input.slice(i + 1, i + 6)));
  }
}

let lastWinner;

let remainingBoards = boards;
for (const number of numbers) {
  const winners = [];
  for (const board of remainingBoards) {
    markBoard(board, number);
    if (isWinner(board)) {
      lastWinner = board;
      winners.push(board);
    }
  }
  remainingBoards = remainingBoards.filter((board) => !winners.includes(board));
  if (winners.length === 1 && remainingBoards.length === 0) {
    console.log(score(lastWinner) * number);
  }
}

function score(board) {
  let sum = 0;
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      if (!board[i][j].marked) {
        sum += board[i][j].value;
      }
    }
  }
  return sum;
}

function isWinner(board) {
  for (let i = 0; i < 5; i++) {
    let total = 0;
    for (let j = 0; j < 5; j++) {
      if (board[i][j].marked) {
        total++;
      }
    }
    if (total === 5) return true;
  }
  for (let j = 0; j < 5; j++) {
    let total = 0;
    for (let i = 0; i < 5; i++) {
      if (board[i][j].marked) {
        total++;
      }
    }
    if (total === 5) return true;
  }
  return false;
}

function markBoard(board, number) {
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      if (board[i][j].value === number) {
        board[i][j].marked = true;
      }
    }
  }
}

function parseBoard(lines) {
  return lines.map((line) =>
    line
      .split(/ +/)
      .map((v) => ({
        marked: false,
        value: Number(v),
      }))
      .slice(-5),
  );
}
