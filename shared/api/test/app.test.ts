import assert from 'node:assert/strict';
import test from 'node:test';
import { createApp } from '../src/app.js';

test('starter liveness works without a database', async () => {
  const app = createApp();
  try {
    const response = await app.inject({ method: 'GET', url: '/health/live' });
    assert.equal(response.statusCode, 200);
    assert.equal(response.json().status, 'ok');
  } finally {
    await app.close();
  }
});

test('an unknown route is not a successful product response', async () => {
  const app = createApp();
  try {
    const response = await app.inject({
      method: 'GET',
      url: '/not-a-product-route',
    });
    assert.equal(response.statusCode, 404);
  } finally {
    await app.close();
  }
});
