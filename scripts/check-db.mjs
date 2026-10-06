import pg from 'pg';

const connectionString = process.env.PRACTICE_DATABASE_URL;
if (!connectionString || connectionString.includes('REPLACE_LOCALLY')) {
  console.error(
    'Configure PRACTICE_DATABASE_URL in ignored .env. See docs/02-windows-setup.md.',
  );
  process.exit(1);
}
const client = new pg.Client({
  connectionString,
  connectionTimeoutMillis: 5000,
});
try {
  await client.connect();
  const result = await client.query(
    'SELECT COUNT(*)::int AS count FROM practice.events',
  );
  console.log(
    'Practice database reachable; fixture events: ' + result.rows[0].count,
  );
  if (result.rows[0].count !== 6) {
    console.error(
      'Expected 6 supplied events. Check your dedicated practice schema and setup.',
    );
    process.exitCode = 1;
  }
} catch {
  console.error(
    'Practice database check failed. Check the server, role/password, dedicated database and fixture load; no connection secret is printed.',
  );
  process.exitCode = 1;
} finally {
  await client.end();
}
