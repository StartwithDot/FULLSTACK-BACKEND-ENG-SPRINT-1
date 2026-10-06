import Fastify from 'fastify';

export function createApp() {
  const app = Fastify({
    logger: {
      redact: {
        paths: [
          'req.headers.authorization',
          'req.headers.cookie',
          'res.headers["set-cookie"]',
        ],
        censor: '[redacted]',
      },
    },
    bodyLimit: 16 * 1024,
    ajv: {
      customOptions: {
        coerceTypes: false,
        removeAdditional: false,
      },
    },
  });

  app.get('/health/live', async () => ({ status: 'ok', mode: 'starter' }));
  return app;
}
