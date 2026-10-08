import { spawn } from 'node:child_process';
import { findSuiteTests } from './test-files.mjs';
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

  const files = await findSuiteTests(process.cwd(), student, database);
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
