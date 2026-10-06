import { createApp } from './app.js';

const port = Number(process.env.PORT ?? 3000);
if (!Number.isInteger(port) || port < 1024 || port > 65535) {
  throw new Error('PORT must be an integer between 1024 and 65535.');
}
const app = createApp();
await app.listen({ host: '127.0.0.1', port });

let closing = false;
async function close() {
  if (closing) return;
  closing = true;
  await app.close();
}
process.once('SIGINT', () => {
  void close().catch(() => {
    process.exitCode = 1;
  });
});
process.once('SIGTERM', () => {
  void close().catch(() => {
    process.exitCode = 1;
  });
});
