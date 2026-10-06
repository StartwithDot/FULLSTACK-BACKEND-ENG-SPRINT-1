import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { findTests } from './test-files.mjs';

const connection = process.env.TEST_DATABASE_URL;
let safe = false;
try {
  const url = new URL(connection);
  safe =
    ['postgres:', 'postgresql:'].includes(url.protocol) &&
    decodeURIComponent(url.pathname).endsWith('_test');
} catch {
  /* Invalid or absent URL: do not print a secret. */
}
if (!safe) {
  console.error(
    'Set TEST_DATABASE_URL to a dedicated PostgreSQL database whose name ends in _test. See docs/02-windows-setup.md.',
  );
  process.exit(1);
}
const files = await findTests(
  fileURLToPath(new URL('../shared/api/test/', import.meta.url)),
  true,
);
if (!files.length) throw new Error('No database tests were found.');
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
