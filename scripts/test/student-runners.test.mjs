import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import { studentAppEnvironment, testDatabaseUrl } from '../student-context.mjs';
import { findTests } from '../test-files.mjs';

const cwd = fileURLToPath(new URL('../../', import.meta.url));

function run(script, args, env = process.env) {
  return spawnSync(process.execPath, [script, ...args], {
    cwd,
    env,
    encoding: 'utf8',
  });
}

test('student commands reject invalid or escaping IDs before running code', () => {
  for (const id of ['BE99', '../BE01']) {
    for (const [script, args] of [
      ['scripts/run-student-api.mjs', [id]],
      ['scripts/run-tests.mjs', ['--student', id]],
    ]) {
      const result = run(script, args);
      assert.equal(result.status, 1);
      assert.match(result.stderr, /BE01 through BE10/);
    }
  }
});

test('test launcher rejects missing IDs, unknown options and duplicate flags', () => {
  for (const args of [
    ['--student'],
    ['--unknown'],
    ['--db', '--db'],
    ['--student', 'BE01', '--student', 'BE02'],
    ['--student', 'BE01', 'extra'],
  ]) {
    const result = run('scripts/run-tests.mjs', args);
    assert.equal(result.status, 1);
    assert.match(result.stderr, /Usage:|BE01 through BE10/);
  }
});

test('student environment selects its lab schema without product fallback', () => {
  const input = {
    DATABASE_URL: 'postgresql://qa@localhost/merchantdesk',
    TEST_DATABASE_URL: 'postgresql://qa@localhost/merchantdesk_test',
  };
  const environment = studentAppEnvironment('BE03', input);
  assert.equal(environment.DATABASE_URL, input.TEST_DATABASE_URL);
  assert.equal(environment.DATABASE_SCHEMA, 'lab_be03');
  assert.equal(input.DATABASE_URL, 'postgresql://qa@localhost/merchantdesk');
  assert.equal(
    studentAppEnvironment('BE01', { DATABASE_URL: input.DATABASE_URL })
      .DATABASE_URL,
    undefined,
  );
});

test('database validation rejects unsafe configuration without leaking credentials', () => {
  assert.equal(
    testDatabaseUrl('postgresql://qa@localhost/merchantdesk_test', true),
    'postgresql://qa@localhost/merchantdesk_test',
  );
  for (const connection of [
    undefined,
    'postgresql://qa:SHOULD_NOT_BE_LOGGED@localhost/merchantdesk',
    'https://qa:SHOULD_NOT_BE_LOGGED@localhost/merchantdesk_test',
    'postgresql://qa:REPLACE_LOCALLY@localhost/merchantdesk_test',
  ]) {
    assert.throws(
      () => testDatabaseUrl(connection, true),
      (error) =>
        /_test/.test(error.message) &&
        !/SHOULD_NOT_BE_LOGGED|REPLACE_LOCALLY/.test(error.message),
    );
  }
});

test('shared and student DB commands reject unsafe configuration before connecting', () => {
  const env = {
    ...process.env,
    TEST_DATABASE_URL:
      'postgresql://qa:SHOULD_NOT_BE_LOGGED@localhost/merchantdesk',
  };
  for (const args of [['--db'], ['--db', '--student', 'BE01']]) {
    const result = run('scripts/run-tests.mjs', args, env);
    assert.equal(result.status, 1);
    assert.match(result.stderr, /_test/);
    assert.equal(
      (result.stdout + result.stderr).includes('SHOULD_NOT_BE_LOGGED'),
      false,
    );
  }
});

test('test discovery separates database tests and includes tooling tests', async () => {
  const product = fileURLToPath(
    new URL('../../shared/api/test/', import.meta.url),
  );
  const fast = await findTests(product, false);
  const database = await findTests(product, true);
  assert.ok(fast.length > 0);
  assert.ok(database.length > 0);
  assert.ok(fast.every((file) => !file.endsWith('.db.test.ts')));
  assert.ok(database.every((file) => file.endsWith('.db.test.ts')));
  const tooling = await findTests(
    fileURLToPath(new URL('./', import.meta.url)),
    false,
  );
  assert.ok(tooling.some((file) => file.endsWith('student-runners.test.mjs')));
});
