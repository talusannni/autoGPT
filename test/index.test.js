import assert from 'node:assert/strict';
import test from 'node:test';
import { LIMITS, factorial, fibonacci, isPrime, primesUpTo } from '../src/index.js';

test('public entry point exposes math operations and limits', () => {
  assert.equal(fibonacci(10), 55);
  assert.equal(factorial(5), 120);
  assert.equal(isPrime(17), true);
  assert.deepEqual(primesUpTo(10), [2, 3, 5, 7]);
  assert.deepEqual(Object.keys(LIMITS).sort(), ['factorial', 'fibonacci', 'isPrime', 'primesUpTo']);
});

test('public limit object cannot be mutated accidentally', () => {
  assert.throws(() => {
    LIMITS.fibonacci = 1;
  }, TypeError);
});
