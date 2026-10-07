import { readdir } from 'node:fs/promises';
import path from 'node:path';

export async function findTests(directory, database) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (['node_modules', 'dist', '.git', 'coverage'].includes(entry.name))
      continue;
    const filename = path.join(directory, entry.name);
    if (entry.isDirectory())
      files.push(...(await findTests(filename, database)));
    else if (
      entry.name.endsWith('.test.ts') &&
      entry.name.endsWith('.db.test.ts') === database
    )
      files.push(filename);
  }
  return files.sort();
}
