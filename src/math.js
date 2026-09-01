import { LIMITS } from './limits.js';

export function fibonacci(n) {
  assertBoundedNonNegativeInteger(n, 'n', LIMITS.fibonacci);

  let a = 0n;
  let b = 1n;

  for (let i = 0; i < n; i += 1) {
    [a, b] = [b, a + b];
  }

  return toSafeNumberOrBigInt(a);
}

export function factorial(n) {
  assertBoundedNonNegativeInteger(n, 'n', LIMITS.factorial);

  let result = 1n;
  for (let i = 2; i <= n; i += 1) {
    result *= BigInt(i);
  }

  return toSafeNumberOrBigInt(result);
}

export function isPrime(n) {
  assertBoundedNonNegativeInteger(n, 'n', LIMITS.isPrime);

  if (n < 2) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;

  for (let divisor = 3; divisor <= Math.sqrt(n); divisor += 2) {
    if (n % divisor === 0) return false;
  }

  return true;
}

export function primesUpTo(limit) {
  assertBoundedNonNegativeInteger(limit, 'limit', LIMITS.primesUpTo);

  if (limit < 2) return [];

  const composite = new Uint8Array(limit + 1);
  const primes = [];

  for (let n = 2; n <= limit; n += 1) {
    if (composite[n] === 0) {
      primes.push(n);
      if (n <= Math.sqrt(limit)) {
        for (let multiple = n * n; multiple <= limit; multiple += n) {
          composite[multiple] = 1;
        }
      }
    }
  }

  return primes;
}

function toSafeNumberOrBigInt(value) {
  return value <= BigInt(Number.MAX_SAFE_INTEGER) ? Number(value) : value;
}

function assertSafeInteger(value, name) {
  if (!Number.isSafeInteger(value)) {
    throw new TypeError(`${name} must be a safe integer`);
  }
}

function assertBoundedNonNegativeInteger(value, name, maximum) {
  assertSafeInteger(value, name);
  if (value < 0) {
    throw new RangeError(`${name} must be non-negative`);
  }
  if (value > maximum) {
    throw new RangeError(`${name} must be <= ${maximum}`);
  }
}
