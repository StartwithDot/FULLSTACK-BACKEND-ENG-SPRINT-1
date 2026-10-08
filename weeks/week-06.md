# Week 6: Make accepted events survive restart

MerchantDesk | Sprint 1 | D: SQL and Persistence + B: Backend Development + E: Engineering and Delivery

## The project need

Restarting the API currently loses all accepted events.

## Before you start

Bring the agreed model and HTTP tests. Use a disposable test database for tests, not your practice database. Follow the migration-runner interface in shared/database/README.md.

## Keep the application connected

Inject the new repository into the original factory. Keep migrations in week-06/database/migrations and use your own lab_beXX schema, as described in the wiring guide.

See the [application wiring guide](../docs/12-application-wiring.md) for commands and module connections.

## Outcome

A fresh migration, parameterized storage and a restart proof.

## Learn and use

| Task    | Concepts and reading                                                                                                                                                                                                                                                                                        | Minutes |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------: |
| `D03.1` | DDL, constraints, timestamps and forward migrations. [PostgreSQL 17 tutorial](https://www.postgresql.org/docs/17/tutorial.html), [PostgreSQL constraints](https://www.postgresql.org/docs/17/ddl-constraints.html)                                                                                          |      55 |
| `B03.1` | pg pooling, parameterized queries, dependency injection and shutdown. [Parameterized node-postgres queries](https://node-postgres.com/features/queries), [node-postgres pooling](https://node-postgres.com/features/pooling), [node-postgres transactions](https://node-postgres.com/features/transactions) |      60 |
| `E06.1` | Database integration tests and restart evidence. [Fastify testing](https://fastify.dev/docs/v5.7.x/Guides/Testing/)                                                                                                                                                                                         |      35 |

## Core tasks

### 1. Write and apply the first migration (`D03.1`)

- [ ] Create merchants and payment_events from the agreed field contract, including a foreign key, amount check and timestamp columns. Use the supplied runner via npm.cmd run migrate:practice -- students/BE01/week-06/database/migrations, replacing BE01. Read fixtures/migration-runner.ts and its support tests, then explain ordered version tracking, one-client transactions and repeat-run behavior. Write schema-relative SQL without transaction commands; do not invent runner plumbing in this task.

**Primary path:** `students/<student-id>/week-06/database/migrations/001-events.sql`.

**Proof for review:** An empty test database migrates; invalid amount/merchant writes fail; a second runner invocation preserves rows.

**Known trap:** Do not edit a migration after the shared cohort has applied it. Add a new migration.

### 2. Connect a pooled repository (`B03.1`)

- [ ] Replace the in-memory storage through a small injected repository. Use bounded Pool configuration, parameter placeholders and finally-based client release. Keep app construction separate from listening and close the pool on shutdown.

**Primary path:** `students/<student-id>/week-06/api/repository.ts`.

**Proof for review:** An event can be inserted and read through the HTTP API without SQL string interpolation or a leaked client.

**Known trap:** A transaction must stay on one checked-out client, not separate pool.query calls.

### 3. Prove persistence and isolate the test (`E06.1`)

- [ ] Use a dedicated test database/schema. Accept one event, close/rebuild the app, and read it back. Record the commands. Demonstrate that a failing database write is not reported as accepted.

**Primary path:** `students/<student-id>/week-06/api/persistence.db.test.ts`.

**Proof for review:** A real database-backed event survives app restart; test cleanup affects only the disposable test namespace.

**Known trap:** A mocked repository test cannot establish PostgreSQL persistence.

## Shared contribution

The build pair promotes reviewed work into `shared/database/migrations/, shared/api/src/repository.ts and shared/api/test/persistence.db.test.ts`. Record the non-author review or witness in the [Week 6 rotation log](../shared/delivery/rotations/week-06.md).

## Milestone: Durable event flow

A non-author reproduces this outcome and records the commands and results in the rotation log before the group advances.

## Completion checklist

- [ ] Three focused task-ID commits with the required proof
- [ ] Peer review and assigned shared-build or witness work completed
- [ ] One implementation decision and failure case explained

Next: [Week 7](week-07.md).
