export function fibonacci(n) {
  assertNonNegativeInteger(n, 'n');

  let a = 0;
  let b = 1;

  for (let i = 0; i < n; i += 1) {
    [a, b] = [b, a + b];
  }

  return a;
}

export function factorial(n) {
  assertNonNegativeInteger(n, 'n');

  let result = 1;
  for (let i = 2; i <= n; i += 1) {
    result *= i;
  }

  return result;
}

export function isPrime(n) {
  assertInteger(n, 'n');

  if (n < 2) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;

  for (let divisor = 3; divisor * divisor <= n; divisor += 2) {
    if (n % divisor === 0) return false;
  }

  return true;
}

export function primesUpTo(limit) {
  assertNonNegativeInteger(limit, 'limit');

  const primes = [];
  for (let n = 2; n <= limit; n += 1) {
    if (isPrime(n)) primes.push(n);
  }

  return primes;
}

function assertInteger(value, name) {
  if (!Number.isInteger(value)) {
    throw new TypeError(`${name} must be an integer`);
  }
}

function assertNonNegativeInteger(value, name) {
  assertInteger(value, name);
  if (value < 0) {
    throw new RangeError(`${name} must be non-negative`);
  }
}
