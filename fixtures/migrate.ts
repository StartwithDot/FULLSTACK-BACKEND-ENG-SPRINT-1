import { existsSync } from 'node:fs';
import path from 'node:path';
import pg from 'pg';
import { applyMigrations } from './migration-runner.js';

const mode = process.argv[2];
const directory =
  mode === 'product' ? 'shared/database/migrations' : process.argv[3];
const connectionString =
  mode === 'product' ? process.env.DATABASE_URL : process.env.TEST_DATABASE_URL;
let schema = 'merchantdesk';
if (mode === 'practice') {
  const normalized = directory?.replaceAll('\\', '/');
  const match = normalized?.match(
    /^students\/(BE(?:0[1-9]|10))\/week-06\/database\/migrations\/?$/,
  );
  if (!match)
    throw new Error('Supply students/YOUR_BE_ID/week-06/database/migrations.');
  schema = 'lab_' + match[1].toLowerCase();
} else if (mode !== 'product') {
  throw new Error('Use the documented product or practice command.');
}
if (!connectionString || connectionString.includes('REPLACE_LOCALLY'))
  throw new Error('Configure the dedicated database URL in ignored .env.');
if (
  mode === 'practice' &&
  !decodeURIComponent(new URL(connectionString).pathname).endsWith('_test')
) {
  throw new Error(
    'Practice migrations require a dedicated database ending in _test.',
  );
}
if (!directory || !existsSync(directory))
  throw new Error(
    'Create the Week 6 migration directory first. See the week file.',
  );
const client = new pg.Client({
  connectionString,
  connectionTimeoutMillis: 5000,
});
try {
  await client.connect();
  const applied = await applyMigrations(
    client,
    path.resolve(directory),
    schema,
  );
  console.log(
    'Applied ' +
      applied.length +
      ' migrations in course schema ' +
      schema +
      '.',
  );
} catch {
  console.error(
    'Migration failed and was rolled back. Check your SQL and local database settings; no secret is printed.',
  );
  process.exitCode = 1;
} finally {
  await client.end();
}
