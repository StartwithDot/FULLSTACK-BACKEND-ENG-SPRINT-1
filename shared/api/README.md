# Fastify API

Run npm.cmd run dev:api from the repository root. The supplied app factory exposes only GET /health/live and binds to 127.0.0.1 in server.ts. There is no completed event API or authentication.

For individual practice, follow the [continuing app wiring](../../docs/14-individual-app-wiring.md). Shared modules must not import students/ code. The later PayHook receiver is defined by the [handoff](../../docs/13-payhook-handoff.md), not implemented in this starter.

Keep route setup in app.ts or modules called by it. Keep listening in server.ts so tests use Fastify injection without occupying a port. Place fast .test.ts files in test/; use .db.test.ts for tests that need the dedicated test database.

Implement the [contract](../../docs/04-api-and-security-contract.md) through Weeks 4-9, then improve it through Week 14. Fastify runtime validation is separate from TypeScript types. Preserve strict rejection of unexpected fields/types.

Future repository clients must be closed in app.onClose. A process liveness check does not prove database readiness.
