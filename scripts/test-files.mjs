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
      /\.test\.(?:ts|mjs)$/.test(entry.name) &&
      /\.db\.test\.(?:ts|mjs)$/.test(entry.name) === database
    )
      files.push(filename);
  }
  return files.sort();
}

export async function findSuiteTests(root, student, database) {
  const directories = student
    ? [path.join(root, 'students', student)]
    : [
        path.join(root, 'shared/api/test'),
        path.join(root, 'students'),
        ...(database ? [] : [path.join(root, 'scripts/test')]),
      ];
  return (
    await Promise.all(
      directories.map((directory) => findTests(directory, database)),
    )
  )
    .flat()
    .sort();
}
