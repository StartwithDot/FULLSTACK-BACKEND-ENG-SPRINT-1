import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const cwd = fileURLToPath(new URL('../../../', import.meta.url));

test('student commands reject an invalid or escaping ID before running code', () => {
  for (const script of [
    'scripts/run-student-api.mjs',
    'scripts/run-student-tests.mjs',
  ]) {
    for (const id of ['BE99', '../BE01']) {
      const result = spawnSync(process.execPath, [script, id], {
        cwd,
        encoding: 'utf8',
      });
      assert.equal(result.status, 1);
      assert.match(result.stderr, /BE01 through BE10/);
    }
  }
});

test('student environment selects its lab schema and never falls back to product data', () => {
  const result = spawnSync(
    process.execPath,
    [
      '--input-type=module',
      '-e',
      `
    import assert from 'node:assert/strict';
    import { studentAppEnvironment } from './scripts/student-context.mjs';
    const input = {
      DATABASE_URL: 'postgresql://qa@localhost/merchantdesk',
      TEST_DATABASE_URL: 'postgresql://qa@localhost/merchantdesk_test'
    };
    const env = studentAppEnvironment('BE03', input);
    assert.equal(env.DATABASE_URL, input.TEST_DATABASE_URL);
    assert.equal(env.DATABASE_SCHEMA, 'lab_be03');
    assert.equal(input.DATABASE_URL, 'postgresql://qa@localhost/merchantdesk');
    assert.equal(studentAppEnvironment('BE01', { DATABASE_URL: input.DATABASE_URL }).DATABASE_URL, undefined);
  `,
    ],
    { cwd, encoding: 'utf8' },
  );
  assert.equal(result.status, 0, result.stderr);
});

test('unsafe database configuration is rejected without exposing its credential', () => {
  const result = spawnSync(
    process.execPath,
    [
      '--input-type=module',
      '-e',
      `
    import assert from 'node:assert/strict';
    import { testDatabaseUrl } from './scripts/student-context.mjs';
    assert.throws(
      () => testDatabaseUrl('postgresql://qa:SHOULD_NOT_BE_LOGGED@localhost/merchantdesk'),
      error => error.message.includes('ending in _test') && !error.message.includes('SHOULD_NOT_BE_LOGGED')
    );
    assert.throws(() => testDatabaseUrl(undefined, true));
  `,
    ],
    { cwd, encoding: 'utf8' },
  );
  assert.equal(result.status, 0, result.stderr);
  assert.equal(
    (result.stdout + result.stderr).includes('SHOULD_NOT_BE_LOGGED'),
    false,
  );
});
