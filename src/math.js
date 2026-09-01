const MAX_FIBONACCI_N = 100_000;
const MAX_FACTORIAL_N = 100_000;
const MAX_PRIME_LIMIT = 10_000_000;

export function fibonacci(n) {
  assertBoundedNonNegativeInteger(n, 'n', MAX_FIBONACCI_N);

  let a = 0n;
  let b = 1n;

  for (let i = 0; i < n; i += 1) {
    [a, b] = [b, a + b];
  }

  return Number.isSafeInteger(Number(a)) ? Number(a) : a;
}

export function factorial(n) {
  assertBoundedNonNegativeInteger(n, 'n', MAX_FACTORIAL_N);

  let result = 1n;
  for (let i = 2; i <= n; i += 1) {
    result *= BigInt(i);
  }

  return Number.isSafeInteger(Number(result)) ? Number(result) : result;
}

export function isPrime(n) {
  assertInteger(n, 'n');

  if (n < 2) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;

  for (let divisor = 3; divisor <= Math.sqrt(n); divisor += 2) {
    if (n % divisor === 0) return false;
  }

  return true;
}

export function primesUpTo(limit) {
  assertBoundedNonNegativeInteger(limit, 'limit', MAX_PRIME_LIMIT);

  const primes = [];
  for (let n = 2; n <= limit; n += 1) {
    if (isPrime(n)) primes.push(n);
  }

  return primes;
}

function assertInteger(value, name) {
  if (!Number.isSafeInteger(value)) {
    throw new TypeError(`${name} must be a safe integer`);
  }
}

function assertBoundedNonNegativeInteger(value, name, maximum) {
  assertInteger(value, name);
  if (value < 0) {
    throw new RangeError(`${name} must be non-negative`);
  }
  if (value > maximum) {
    throw new RangeError(`${name} must be <= ${maximum}`);
  }
}
