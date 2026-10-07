# Week 6: Make accepted events survive restart

MerchantDesk | Sprint 1 | D: SQL and Persistence + B: Backend Development + E: Engineering and Delivery

Read this file completely, then work through its three core tasks. Everyone follows the same tasks. Track letters describe skills, not student specialisations.

## The project need

Restarting the API currently loses all accepted events.

## Before you start

Bring the agreed model and HTTP tests. Use a disposable test database for tests, not your practice database. Follow the migration-runner interface in shared/database/README.md.

Use the [student guide](../docs/03-student-guide.md) for commands, [resource map](../docs/07-resources.md) for bounded reading and [troubleshooting](../docs/09-troubleshooting.md) when a tool fails. Replace `<student-id>` with your assigned BE number.

## Keep the application connected

Inject the new repository into the original factory. Keep migrations in week-06/database/migrations and use your own lab_beXX schema, as described in the wiring guide.

Read the [individual wiring guide](../docs/14-individual-app-wiring.md) for the module map and repeatable commands. This is integration guidance for the existing core tasks, not additional work.

## By the end you can

- Write and apply the first migration, and explain the result using the proof below.
- Connect a pooled repository, and explain the result using the proof below.
- Prove persistence and isolate the test, and explain the result using the proof below.

The shared outcome is: A fresh migration, parameterized storage and a restart proof.

## Five-hour budget

| Work                                                  | Minutes |
| ----------------------------------------------------- | ------: |
| Guided learning, task reading and any scheduled setup |      90 |
| Three individual core tasks                           |     150 |
| Shared promotion OR paired review/witness work        |      30 |
| Weekly review, explanation and revision               |      30 |
| Total                                                 |     300 |

Task times are planning estimates, not measured promises. Review and build work are included, not extra homework. Builders reuse their proven lab work rather than completing a second independent application. Other students spend the shared slot reviewing or reproducing the same behavior. If a tool blocks you, use the supported starter/fixture and ask for help; report the blocker before the budget runs out.

## Learn and use it together

| Task       | Learn only what this task needs                                                                                                                                                                                                                                                                             | Use immediately                        | Minutes |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- | ------: |
| 1: `D03.1` | DDL, constraints, timestamps and forward migrations. [PostgreSQL 17 tutorial](https://www.postgresql.org/docs/17/tutorial.html), [PostgreSQL constraints](https://www.postgresql.org/docs/17/ddl-constraints.html)                                                                                          | Write and apply the first migration    |      55 |
| 2: `B03.1` | pg pooling, parameterized queries, dependency injection and shutdown. [Parameterized node-postgres queries](https://node-postgres.com/features/queries), [node-postgres pooling](https://node-postgres.com/features/pooling), [node-postgres transactions](https://node-postgres.com/features/transactions) | Connect a pooled repository            |      60 |
| 3: `E06.1` | Database integration tests and restart evidence. [Fastify testing](https://fastify.dev/docs/v5.7.x/Guides/Testing/)                                                                                                                                                                                         | Prove persistence and isolate the test |      35 |

## Core tasks

### 1. Write and apply the first migration (`D03.1`)

- [ ] Create merchants and payment_events from the agreed field contract, including a foreign key, amount check and timestamp columns. Use the supplied runner via npm.cmd run migrate:practice -- students/BE01/week-06/database/migrations, replacing BE01. Read fixtures/migration-runner.ts and its support tests, then explain ordered version tracking, one-client transactions and repeat-run behavior. Write schema-relative SQL without transaction commands; do not invent runner plumbing in this task.

**Primary commit path:** `students/<student-id>/week-06/database/migrations/001-events.sql`. Small companion source/tests/notes needed by this same task may be committed with it. If the path names an earlier week, continue that existing lab; do not restart it.

**Proof for review:** An empty test database migrates; invalid amount/merchant writes fail; a second runner invocation preserves rows.

**Known trap:** Do not edit a migration after the shared cohort has applied it. Add a new migration.

### 2. Connect a pooled repository (`B03.1`)

- [ ] Replace the in-memory storage through a small injected repository. Use bounded Pool configuration, parameter placeholders and finally-based client release. Keep app construction separate from listening and close the pool on shutdown.

**Primary commit path:** `students/<student-id>/week-06/api/repository.ts`. Small companion source/tests/notes needed by this same task may be committed with it. If the path names an earlier week, continue that existing lab; do not restart it.

**Proof for review:** An event can be inserted and read through the HTTP API without SQL string interpolation or a leaked client.

**Known trap:** A transaction must stay on one checked-out client, not separate pool.query calls.

### 3. Prove persistence and isolate the test (`E06.1`)

- [ ] Use a dedicated test database/schema. Accept one event, close/rebuild the app, and read it back. Record the commands. Demonstrate that a failing database write is not reported as accepted.

**Primary commit path:** `students/<student-id>/week-06/api/persistence.db.test.ts`. Small companion source/tests/notes needed by this same task may be committed with it. If the path names an earlier week, continue that existing lab; do not restart it.

**Proof for review:** A real database-backed event survives app restart; test cleanup affects only the disposable test namespace.

**Known trap:** A mocked repository test cannot establish PostgreSQL persistence.

## Shared contribution

Only this week's build pair promotes the reviewed work into `shared/database/migrations/, shared/api/src/repository.ts and shared/api/test/persistence.db.test.ts`. This is a product contribution, not a permission to copy someone else's answer. Each contributor commits their own change with task IDs and a shared suffix. A non-author checks the result. Use the [rotation plan](../docs/06-team-roles.md).

## Milestone: Durable event flow

The group agrees the requirement and reproduces the scenario before depending on it. Record the witness and outcome in the weekly rotation log. A calendar date or a green starter test is not milestone evidence.

## End-of-week checklist

- [ ] Three focused core task commits with the exact IDs and own-folder paths
- [ ] Proof covers the stated failure cases, not only the happy path
- [ ] One peer review with a reason or useful question
- [ ] Shared pair or non-author witness/review slot completed
- [ ] No credentials, local database data, dependencies or generated build output committed
- [ ] I can explain one decision without copying a tutorial

**If time is short:** cut visual polish, extra examples and optional repetition first. Never silently remove the core proofs or this milestone. Report the concrete blocker and continue through the same essential learning path with mentor help. Extra available time is for repetition, not a different technology track.

Next: [Week 7](week-07.md).
