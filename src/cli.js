#!/usr/bin/env node

import { readFile } from 'node:fs/promises';
import { factorial, fibonacci, primesUpTo } from './math.js';

const args = process.argv.slice(2);

function printUsage(output = console.error) {
  output('Usage: utility-math <fibonacci|factorial|primes> <non-negative integer>');
  output('       utility-math --help');
  output('       utility-math --version');
}

function parseInteger(input) {
  if (input === undefined || !/^\d+$/.test(input)) {
    throw new TypeError('value must be a non-negative integer');
  }

  const number = Number(input);
  if (!Number.isSafeInteger(number)) {
    throw new RangeError('value must be a safe integer');
  }

  return number;
}

async function getVersion() {
  const packageUrl = new URL('../package.json', import.meta.url);
  const packageJson = JSON.parse(await readFile(packageUrl, 'utf8'));
  return packageJson.version;
}

async function main() {
  if (args.length === 1 && args[0] === '--help') {
    printUsage(console.log);
    return;
  }

  if (args.length === 1 && args[0] === '--version') {
    console.log(await getVersion());
    return;
  }

  if (args.length !== 2 || !['fibonacci', 'factorial', 'primes'].includes(args[0])) {
    printUsage();
    process.exitCode = 1;
    return;
  }

  const [command, value] = args;
  const n = parseInteger(value);

  switch (command) {
    case 'fibonacci':
      console.log(fibonacci(n));
      break;
    case 'factorial':
      console.log(factorial(n));
      break;
    case 'primes':
      console.log(primesUpTo(n).join(' '));
      break;
    default:
      throw new Error('unsupported command');
  }
}

main().catch((error) => {
  console.error(`Error: ${error.message}`);
  process.exitCode = 1;
});
