import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import type { Client } from 'pg';

// Supplied infrastructure support. Students write and explain the SQL.
export async function applyMigrations(
  client: Client,
  directory: string,
  schema: string,
) {
  if (
    !/^[a-z][a-z0-9_]{0,62}$/.test(schema) ||
    schema.startsWith('pg_') ||
    schema === 'public'
  ) {
    throw new Error(
      'Use a dedicated course schema, not a system/public schema.',
    );
  }
  const names = (await readdir(directory))
    .filter((name) => name.endsWith('.sql'))
    .sort();
  if (
    !names.length ||
    names.some((name) => !/^[0-9]{3}-[a-z0-9-]+\.sql$/.test(name))
  ) {
    throw new Error('Supply ordered NNN-name.sql migration files.');
  }
  const quoted = '"' + schema + '"';
  const applied: string[] = [];
  await client.query('BEGIN');
  try {
    await client.query('SELECT pg_advisory_xact_lock(hashtext($1)::bigint)', [
      'merchantdesk-migrations:' + schema,
    ]);
    await client.query('CREATE SCHEMA IF NOT EXISTS ' + quoted);
    await client.query('SET LOCAL search_path TO ' + quoted + ', pg_catalog');
    await client.query(
      'CREATE TABLE IF NOT EXISTS ' +
        quoted +
        '.__cohort_migrations (version text PRIMARY KEY, applied_at timestamptz NOT NULL DEFAULT NOW())',
    );
    for (const name of names) {
      const previous = await client.query(
        'SELECT version FROM ' +
          quoted +
          '.__cohort_migrations WHERE version = $1',
        [name],
      );
      if (previous.rowCount) continue;
      const sql = await readFile(path.join(directory, name), 'utf8');
      if (/^\s*(?:BEGIN|COMMIT|ROLLBACK|START\s+TRANSACTION)\b/im.test(sql)) {
        throw new Error(
          'Migration files must not control the runner transaction.',
        );
      }
      await client.query(sql);
      await client.query(
        'INSERT INTO ' + quoted + '.__cohort_migrations (version) VALUES ($1)',
        [name],
      );
      applied.push(name);
    }
    await client.query('COMMIT');
    return applied;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  }
}
