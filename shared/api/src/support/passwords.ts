import { randomBytes, scrypt, timingSafeEqual } from 'node:crypto';

// Provided support code, not a task to invent a password algorithm.
// Fixed scrypt work factor: N=2^15, r=8, p=3; no attacker-selected cost.
const PREFIX = 'scrypt-v1';
const OPTIONS = { N: 32768, r: 8, p: 3, maxmem: 64 * 1024 * 1024 };
const MAX_PASSWORD_BYTES = 256;

function validPassword(password: string) {
  const length = Buffer.byteLength(password, 'utf8');
  return length >= 1 && length <= MAX_PASSWORD_BYTES;
}

function derive(password: string, salt: Buffer): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    scrypt(password, salt, 64, OPTIONS, (error, key) => {
      if (error) reject(error);
      else resolve(key);
    });
  });
}

export async function hashPassword(password: string): Promise<string> {
  if (!validPassword(password))
    throw new Error('Password must be 1-256 UTF-8 bytes.');
  const salt = randomBytes(16);
  const digest = await derive(password, salt);
  return [PREFIX, salt.toString('hex'), digest.toString('hex')].join('$');
}

export async function verifyPassword(
  password: string,
  stored: string,
): Promise<boolean> {
  if (!validPassword(password)) return false;
  const parts = stored.split('$');
  if (parts.length !== 3 || parts[0] !== PREFIX) return false;
  const [, saltHex = '', digestHex = ''] = parts;
  if (!/^[0-9a-f]{32}$/.test(saltHex) || !/^[0-9a-f]{128}$/.test(digestHex))
    return false;
  const actual = await derive(password, Buffer.from(saltHex, 'hex'));
  return timingSafeEqual(actual, Buffer.from(digestHex, 'hex'));
}
