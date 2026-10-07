import { existsSync } from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { parseStudentId, studentAppEnvironment } from './student-context.mjs';

try {
  const student = parseStudentId(process.argv[2]);
  if (process.argv.length !== 3)
    throw new Error('Usage: npm.cmd run dev:student -- BE01');
  const file = path.resolve('students', student, 'week-04/api/server.ts');
  if (!existsSync(file))
    throw new Error(
      'Create your Week 4 API shell first. See docs/14-individual-app-wiring.md.',
    );
  const child = spawn(process.execPath, ['--import', 'tsx', file], {
    stdio: 'inherit',
    env: studentAppEnvironment(student, process.env),
  });
  child.on('error', () => {
    console.error('Student API process could not start.');
    process.exitCode = 1;
  });
  child.on('exit', (code) => {
    process.exitCode = code ?? 1;
  });
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
