#!/usr/bin/env node

import { factorial, fibonacci, primesUpTo } from './math.js';

const args = process.argv.slice(2);
const [command, value] = args;

function printUsage() {
  console.error('Usage: utility-math <fibonacci|factorial|primes> <non-negative integer>');
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

try {
  if (args.length !== 2 || !['fibonacci', 'factorial', 'primes'].includes(command)) {
    printUsage();
    process.exitCode = 1;
  } else {
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
    }
  }
} catch (error) {
  console.error(`Error: ${error.message}`);
  process.exitCode = 1;
}
