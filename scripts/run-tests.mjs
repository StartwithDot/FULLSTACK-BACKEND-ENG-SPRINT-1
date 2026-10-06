import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { findTests } from './test-files.mjs';

const directory = fileURLToPath(
  new URL('../shared/api/test/', import.meta.url),
);
const files = await findTests(directory, false);
if (!files.length) throw new Error('No fast tests were found.');
const child = spawn(process.execPath, ['--import', 'tsx', '--test', ...files], {
  stdio: 'inherit',
});
child.on('error', (error) => {
  console.error(error.message);
  process.exitCode = 1;
});
child.on('exit', (code) => {
  process.exitCode = code ?? 1;
});
