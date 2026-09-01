import assert from 'node:assert/strict';
import { execFileSync, spawnSync } from 'node:child_process';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const cliPath = join(projectRoot, 'src', 'cli.js');

function runCli(...args) {
  return spawnSync(process.execPath, [cliPath, ...args], { encoding: 'utf8' });
}

test('CLI calculates Fibonacci numbers', () => {
  assert.equal(execFileSync(process.execPath, [cliPath, 'fibonacci', '10'], { encoding: 'utf8' }).trim(), '55');
});

test('CLI calculates factorials', () => {
  assert.equal(execFileSync(process.execPath, [cliPath, 'factorial', '5'], { encoding: 'utf8' }).trim(), '120');
});

test('CLI lists primes through a limit', () => {
  assert.equal(execFileSync(process.execPath, [cliPath, 'primes', '10'], { encoding: 'utf8' }).trim(), '2 3 5 7');
});

test('CLI rejects missing arguments', () => {
  const result = runCli('fibonacci');
  assert.equal(result.status, 1);
  assert.match(result.stderr, /Usage:/);
});

test('CLI rejects unknown commands', () => {
  const result = runCli('power', '2');
  assert.equal(result.status, 1);
  assert.match(result.stderr, /Usage:/);
});

test('CLI rejects extra arguments', () => {
  const result = runCli('fibonacci', '10', 'extra');
  assert.equal(result.status, 1);
  assert.match(result.stderr, /Usage:/);
});

test('CLI rejects invalid numeric input', () => {
  const result = runCli('factorial', '-1');
  assert.equal(result.status, 1);
  assert.match(result.stderr, /non-negative integer/);
});

test('CLI rejects unsafe integers', () => {
  const result = runCli('fibonacci', '9007199254740992');
  assert.equal(result.status, 1);
  assert.match(result.stderr, /safe integer/);
});

test('CLI rejects excessive operation sizes', () => {
  for (const [command, value, message] of [
    ['fibonacci', '100001', '100000'],
    ['factorial', '100001', '100000'],
    ['primes', '10000001', '10000000'],
  ]) {
    const result = runCli(command, value);
    assert.equal(result.status, 1);
    assert.match(result.stderr, new RegExp(`must be <= ${message}`));
  }
});
