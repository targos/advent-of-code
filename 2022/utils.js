import { open } from 'node:fs/promises';

export async function* readInput(url, transform = String) {
  const fh = await open(new URL(getInputFile(), url));

  for await (const line of fh.readLines()) {
    yield transform(line);
  }
}

function getInputFile() {
  return process.argv.includes('train') ? 'train.txt' : 'input.txt';
}
