import { spawn } from 'node:child_process';
import path from 'node:path';
import { findTests } from './test-files.mjs';
import { parseStudentId, testDatabaseUrl } from './student-context.mjs';

try {
  const database = process.argv[2] === '--db';
  const student = parseStudentId(process.argv[database ? 3 : 2]);
  if (process.argv.length !== (database ? 4 : 3))
    throw new Error('Supply only your student ID.');
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
  const files = await findTests(path.resolve('students', student), database);
  if (!files.length)
    throw new Error(
      'No ' +
        (database ? 'database' : 'fast') +
        ' tests found for ' +
        student +
        '. Write the stated task tests first.',
    );
  const child = spawn(
    process.execPath,
    ['--import', 'tsx', '--test', ...files],
    {
      stdio: 'inherit',
      env: environment,
    },
  );
  child.on('error', () => {
    console.error('Student test process could not start.');
    process.exitCode = 1;
  });
  child.on('exit', (code) => {
    process.exitCode = code ?? 1;
  });
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
