# Utility Math CLI

A small Node.js package and CLI for common utility math operations:

- Fibonacci numbers
- Factorials
- Prime numbers up to a limit

## Requirements

- Node.js 20+

## CLI usage

```bash
node src/cli.js fibonacci 10
# 55

node src/cli.js factorial 5
# 120

node src/cli.js primes 20
# 2 3 5 7 11 13 17 19

node src/cli.js --help
node src/cli.js --version
```

The command accepts exactly one operation and one non-negative safe integer. Inputs are bounded to prevent accidental or malicious unbounded work:

- Fibonacci: `0` through `100000`
- Factorial: `0` through `100000`
- Primes: `0` through `10000000`

Large Fibonacci and factorial results are returned as `bigint` values when they no longer fit exactly in JavaScript's safe integer range.

Invalid, missing, extra, unsafe, or out-of-range arguments return a non-zero exit code.

## Library usage

The package exposes a stable root entry point:

```js
import { factorial, fibonacci, isPrime, primesUpTo, LIMITS } from 'utility-math-cli';

const value = fibonacci(10);
const primes = primesUpTo(20);
```

`LIMITS` is frozen and exposes the maximum supported input for each operation.

## Tests

Run the complete test suite with:

```bash
npm ci
npm test
```

The suite covers the math functions, exact large-integer results, bounded inputs, invalid inputs, the public package entry point, CLI behavior, and CLI error handling. GitHub Actions runs the test suite on every push and pull request.
