import assert from 'node:assert/strict';
import test from 'node:test';
import { hashPassword, verifyPassword } from '../../../fixtures/passwords.js';

test('password support verifies without storing plaintext and uses fresh salts', async () => {
  const password = 'synthetic-test-only';
  const first = await hashPassword(password);
  const second = await hashPassword(password);
  assert.notEqual(first, second);
  assert.equal(first.includes(password), false);
  assert.equal(await verifyPassword(password, first), true);
  assert.equal(await verifyPassword('wrong-password', first), false);
});
test('malformed stored hashes and unbounded passwords are rejected', async () => {
  assert.equal(await verifyPassword('x', 'scrypt-v1$xx$xx'), false);
  assert.equal(
    await verifyPassword(
      'x',
      'other$' + '00'.repeat(16) + '$' + '00'.repeat(64),
    ),
    false,
  );
  await assert.rejects(() => hashPassword(''));
  await assert.rejects(() => hashPassword('x'.repeat(257)));
});
