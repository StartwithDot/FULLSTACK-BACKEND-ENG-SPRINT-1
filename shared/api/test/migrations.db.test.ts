import assert from 'node:assert/strict';
import { randomBytes } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import pg from 'pg';
import { applyMigrations } from '../src/support/migrations.js';

test('supplied migration support tracks versions and rolls back failed batches', async () => {
  const connectionString = process.env.TEST_DATABASE_URL;
  if (
    !connectionString ||
    !decodeURIComponent(new URL(connectionString).pathname).endsWith('_test')
  ) {
    throw new Error('Use a dedicated TEST_DATABASE_URL ending in _test.');
  }
  const schema = 'qa_' + randomBytes(12).toString('hex');
  const failedSchema = schema + '_bad';
  const client = new pg.Client({
    connectionString,
    connectionTimeoutMillis: 5000,
  });
  await client.connect();
  try {
    const good = fileURLToPath(
      new URL('./fixtures/migrations/', import.meta.url),
    );
    const bad = fileURLToPath(
      new URL('./fixtures/invalid-migrations/', import.meta.url),
    );
    assert.deepEqual(await applyMigrations(client, good, schema), [
      '001-marker.sql',
    ]);
    assert.deepEqual(await applyMigrations(client, good, schema), []);
    const count = await client.query(
      'SELECT COUNT(*)::int AS count FROM ' + schema + '.runner_marker',
    );
    assert.equal(count.rows[0].count, 1);
    await assert.rejects(() => applyMigrations(client, bad, failedSchema));
    const exists = await client.query(
      'SELECT EXISTS(SELECT 1 FROM pg_namespace WHERE nspname = $1) AS present',
      [failedSchema],
    );
    assert.equal(exists.rows[0].present, false);
  } finally {
    // Both identifiers are random namespaces made only by this test.
    await client.query('DROP SCHEMA IF EXISTS ' + schema + ' CASCADE');
    await client.query('DROP SCHEMA IF EXISTS ' + failedSchema + ' CASCADE');
    await client.end();
  }
});
