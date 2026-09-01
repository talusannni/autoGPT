# Utility Math CLI

A small Node.js CLI for common utility math operations:

- Fibonacci numbers
- Factorials
- Prime numbers up to a limit

## Requirements

- Node.js 20+

## Usage

```bash
node src/cli.js fibonacci 10
# 55

node src/cli.js factorial 5
# 120

node src/cli.js primes 20
# 2 3 5 7 11 13 17 19
```

After installing the package, the `utility-math` executable can also be used.

## Tests

Run the test suite with:

```bash
npm test
```

GitHub Actions runs the test suite on every push and pull request.
