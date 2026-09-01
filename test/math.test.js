import assert from 'node:assert/strict';
import test from 'node:test';
import { factorial, fibonacci, isPrime, primesUpTo } from '../src/math.js';
import { LIMITS } from '../src/limits.js';

test('fibonacci returns the nth Fibonacci number', () => {
  assert.equal(fibonacci(0), 0);
  assert.equal(fibonacci(1), 1);
  assert.equal(fibonacci(10), 55);
});

test('factorial returns the factorial of n', () => {
  assert.equal(factorial(0), 1);
  assert.equal(factorial(1), 1);
  assert.equal(factorial(5), 120);
});

test('isPrime identifies prime and non-prime integers', () => {
  assert.equal(isPrime(2), true);
  assert.equal(isPrime(17), true);
  assert.equal(isPrime(1), false);
  assert.equal(isPrime(21), false);
});

test('primesUpTo returns all primes through the limit', () => {
  assert.deepEqual(primesUpTo(10), [2, 3, 5, 7]);
  assert.deepEqual(primesUpTo(1), []);
});

test('math functions reject invalid input and unreasonable work', () => {
  assert.throws(() => fibonacci(-1), RangeError);
  assert.throws(() => fibonacci(LIMITS.fibonacci + 1), RangeError);
  assert.throws(() => factorial(1.5), TypeError);
  assert.throws(() => factorial(LIMITS.factorial + 1), RangeError);
  assert.throws(() => isPrime(2.5), TypeError);
  assert.throws(() => isPrime(LIMITS.isPrime + 1), RangeError);
  assert.throws(() => primesUpTo(-1), RangeError);
  assert.throws(() => primesUpTo(LIMITS.primesUpTo + 1), RangeError);
});

test('math functions reject values outside the safe integer domain', () => {
  assert.throws(() => fibonacci(Number.MAX_SAFE_INTEGER + 1), TypeError);
  assert.throws(() => factorial(Number.MAX_SAFE_INTEGER + 1), TypeError);
  assert.throws(() => isPrime(Number.MAX_SAFE_INTEGER + 1), TypeError);
  assert.throws(() => primesUpTo(Number.MAX_SAFE_INTEGER + 1), TypeError);
});

test('large integer results remain exact', () => {
  assert.equal(fibonacci(79), 14472334024676221n);
  assert.equal(factorial(21), 51090942171709440000n);
});
