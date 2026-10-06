import assert from 'node:assert/strict';
import { randomBytes } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import pg from 'pg';

test('practice fixture is idempotent and enforces its foreign key', async () => {
  const connectionString = process.env.TEST_DATABASE_URL;
  if (
    !connectionString ||
    !decodeURIComponent(new URL(connectionString).pathname).endsWith('_test')
  ) {
    throw new Error(
      'Use TEST_DATABASE_URL pointing to a dedicated database ending in _test.',
    );
  }
  const schema = 'qa_' + randomBytes(12).toString('hex');
  const client = new pg.Client({
    connectionString,
    connectionTimeoutMillis: 5000,
  });
  await client.connect();
  try {
    const original = await readFile(
      new URL('../../../fixtures/practice.sql', import.meta.url),
      'utf8',
    );
    const sql = original.replace(/\bpractice\b/g, schema);
    await client.query(sql);
    await client.query(sql);
    const events = await client.query(
      'SELECT COUNT(*)::int AS count FROM ' + schema + '.events',
    );
    const merchants = await client.query(
      'SELECT COUNT(*)::int AS count FROM ' + schema + '.merchants',
    );
    assert.equal(events.rows[0].count, 6);
    assert.equal(merchants.rows[0].count, 2);
    await assert.rejects(
      () =>
        client.query(
          'INSERT INTO ' +
            schema +
            ".events VALUES (100, 'missing', 'bad', 'payment.captured', 1, 'INR', NOW())",
        ),
      (error: unknown) =>
        typeof error === 'object' &&
        error !== null &&
        'code' in error &&
        error.code === '23503',
    );
  } finally {
    // Random hex identifier is created by this test, never read from user input.
    await client.query('ROLLBACK');
    await client.query('DROP SCHEMA IF EXISTS ' + schema + ' CASCADE');
    await client.end();
  }
});
