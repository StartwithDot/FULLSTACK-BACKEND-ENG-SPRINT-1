import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';

assert.ok(existsSync('curriculum.json'), 'Run from the repository root.');
const data = JSON.parse(readFileSync('curriculum.json', 'utf8'));
assert.equal(data.weeks.length, 15);
assert.equal(data.students.length, 10);
assert.equal(new Set(data.students).size, 10);
const ids = new Set();
for (const [index, week] of data.weeks.entries()) {
  const number = String(week.number).padStart(2, '0');
  assert.equal(week.number, index + 1);
  assert.equal(week.tasks.length, 3);
  assert.equal(
    Object.values(week.budget).reduce((a, b) => a + b, 0),
    300,
  );
  assert.equal(
    week.tasks.reduce((sum, task) => sum + task.minutes, 0),
    week.budget.tasks,
  );
  const canonical = 'weeks/week-' + number + '.md';
  const text = readFileSync(canonical, 'utf8');
  assert.ok(existsSync('shared/delivery/rotations/week-' + number + '.md'));
  for (const track of week.tracks) assert.ok(data.tracks[track]);
  for (const task of week.tasks) {
    assert.ok(!ids.has(task.id), 'Duplicate task: ' + task.id);
    ids.add(task.id);
    assert.ok(text.includes(task.id), 'Missing weekly task: ' + task.id);
    for (const key of ['instructions', 'proof', 'trap', 'path']) {
      assert.ok(
        text.includes(task[key]),
        'Task map/week mismatch: ' + task.id + ':' + key,
      );
    }
    assert.ok(
      !path.isAbsolute(task.path) && !task.path.split(/[\\/]/).includes('..'),
    );
    for (const key of task.resources)
      assert.ok(data.sources[key], 'Missing resource ' + key);
  }
  for (const student of data.students) {
    const pointer = readFileSync(
      'students/' + student + '/week-' + number + '/problem_statement.md',
      'utf8',
    );
    assert.ok(pointer.includes('weeks/week-' + number + '.md'));
    for (const task of week.tasks) assert.ok(pointer.includes(task.id));
  }
}
assert.equal(ids.size, 45);

const official =
  'https://github.com/StartwithDot/FULLSTACK-BACKEND-ENG-SPRINT-1';
const guide = readFileSync('docs/03-student-guide.md', 'utf8');
const publication = readFileSync('admin/publishing.md', 'utf8');
assert.ok(guide.includes(official + '.git'));
assert.ok(
  guide.includes(
    'https://github.com/YOUR_USERNAME/FULLSTACK-BACKEND-ENG-SPRINT-1.git',
  ),
);
assert.ok(publication.includes(official + '.git'));
assert.ok(
  !publication.includes(
    'https://github.com/jrk101/Backend-Engineering-Sprint-1',
  ),
);
const wiring = readFileSync('docs/12-application-wiring.md', 'utf8');
assert.ok(wiring.includes('week-04/api/app.ts'));
assert.ok(wiring.includes('week-04/api/server.ts'));
for (const week of data.weeks.filter((week) => week.number >= 4)) {
  const number = String(week.number).padStart(2, '0');
  assert.ok(
    readFileSync('weeks/week-' + number + '.md', 'utf8').includes(
      '12-application-wiring.md',
    ),
  );
}
const handoff = readFileSync('admin/payhook-handoff.md', 'utf8');
assert.ok(handoff.includes('/integrations/payhook/events'));
assert.ok(handoff.includes('Authorization: Bearer'));
assert.ok(handoff.includes('following sprint'));
const scripts = JSON.parse(readFileSync('package.json', 'utf8')).scripts;
for (const command of ['dev:student', 'test:student', 'test:student:db'])
  assert.ok(scripts[command]);
for (const command of Object.values(scripts)) {
  for (const match of command.matchAll(/scripts\/[\w/-]+\.mjs/g))
    assert.ok(existsSync(match[0]), 'Missing npm command helper: ' + match[0]);
}

function visit(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (
      ['node_modules', '.git', '.qa', 'dist', 'coverage'].includes(entry.name)
    )
      continue;
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      visit(file);
      continue;
    }
    if (!/\.(md|json|ts|tsx|mjs|sql|css|html|yml)$/.test(entry.name)) continue;
    const text = readFileSync(file, 'utf8');
    assert.ok(!text.includes('\u2014'), 'Em dash found in ' + file);
    if (!file.endsWith('.md')) continue;
    const prose = text.replace(/```[\s\S]*?```/g, '');
    for (const match of prose.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
      const target = match[1].split('#')[0].replace(/^<|>$/g, '');
      if (!target || /^[a-z][a-z0-9+.-]*:/i.test(target)) continue;
      const resolved = path.resolve(
        path.dirname(file),
        decodeURIComponent(target),
      );
      assert.ok(existsSync(resolved), 'Broken link in ' + file + ': ' + target);
    }
  }
}
visit('.');
console.log(
  'Verified 15 weeks, 45 task IDs, 10 student folders, weekly budgets, resource keys, local links and no em dashes.',
);
