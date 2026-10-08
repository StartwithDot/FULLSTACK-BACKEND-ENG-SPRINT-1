import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { findTests } from './test-files.mjs';
import { parseStudentId, testDatabaseUrl } from './student-context.mjs';

try {
  const args = process.argv.slice(2);
  let database = false;
  let student;
  while (args.length) {
    const argument = args.shift();
    if (argument === '--db' && !database) database = true;
    else if (argument === '--student' && student === undefined)
      student = parseStudentId(args.shift());
    else throw new Error('Usage: run-tests.mjs [--db] [--student BE01]');
  }

  const environment = { ...process.env };
  delete environment.DATABASE_URL;
  delete environment.DATABASE_SCHEMA;
  if (database) {
    environment.TEST_DATABASE_URL = testDatabaseUrl(
      process.env.TEST_DATABASE_URL,
      true,
    );
    environment.DATABASE_URL = environment.TEST_DATABASE_URL;
  }

  const directories = student
    ? [path.resolve('students', student)]
    : [
        fileURLToPath(new URL('../shared/api/test/', import.meta.url)),
        ...(database
          ? []
          : [fileURLToPath(new URL('./test/', import.meta.url))]),
      ];
  const files = (
    await Promise.all(
      directories.map((directory) => findTests(directory, database)),
    )
  )
    .flat()
    .sort();
  if (!files.length)
    throw new Error(
      'No ' +
        (database ? 'database' : 'fast') +
        ' tests found' +
        (student
          ? ' for ' + student + '. Write the stated task tests first.'
          : '.'),
    );

  const child = spawn(
    process.execPath,
    ['--import', 'tsx', '--test', ...files],
    { stdio: 'inherit', env: environment },
  );
  child.on('error', () => {
    console.error('Test process could not start.');
    process.exitCode = 1;
  });
  child.on('exit', (code) => {
    process.exitCode = code ?? 1;
  });
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
