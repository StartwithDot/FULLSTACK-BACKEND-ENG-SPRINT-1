# Week 7: Handle repetition and bound the list

MerchantDesk | Sprint 1 | D: SQL and Persistence + T: TypeScript and JavaScript + B: Backend Development

## The project need

Repeated event IDs can create duplicate records, and an unbounded list can grow without limit.

## Before you start

Keep the app local-only until the auth and ownership work is complete. Use PostgreSQL uniqueness, not a SELECT-before-INSERT assumption.

## Keep the application connected

Apply the identity migration through the original migration directory and import the outcome/list helpers into your existing repository/routes. Keep one list endpoint.

See the [application wiring guide](../docs/12-application-wiring.md) for commands and module connections.

## Outcome

Database-backed duplicate behavior and a stable, bounded listing contract.

## Learn and use

| Task    | Concepts and reading                                                                                                                                                                                                                 | Minutes |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------: |
| `D04.1` | Composite uniqueness, ON CONFLICT and concurrent requests. [PostgreSQL constraints](https://www.postgresql.org/docs/17/ddl-constraints.html), [PostgreSQL INSERT and conflicts](https://www.postgresql.org/docs/17/sql-insert.html)  |      55 |
| `T05.1` | Unions, interfaces, Map/Set basics and simple complexity reasoning. [Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html), [Everyday types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html) |      45 |
| `B04.1` | Query validation, LIMIT/OFFSET and deterministic ordering. [PostgreSQL LIMIT and OFFSET](https://www.postgresql.org/docs/17/queries-limit.html), [Parameterized node-postgres queries](https://node-postgres.com/features/queries)   |      50 |

## Core tasks

### 1. Protect event identity in the database (`D04.1`)

- [ ] Inspect existing rows for duplicate merchant/provider identities before adding the unique key (merchant_id, provider_event_id) through a new migration. If duplicates exist, preserve them and agree an explicit reconciliation with the reviewer; do not silently delete or reset. Test a fresh schema and the upgrade fixture. Define identical repeat as 200 with the existing ID, and changed content under the same identity as 409. Use an atomic insert/conflict path. Add a small test that starts two identical requests together. Keep the stated SQL artifact and include the applied forward migration as week-06/database/migrations/002-event-identity.sql in the same task commit.

**Primary path:** `students/<student-id>/week-07/database/deduplication.sql`.

**Proof for review:** Sequential and overlapping identical requests leave one row; the same ID with changed agreed fields returns 409 and keeps the first record.

**Known trap:** An in-process Set or pre-insert check alone does not protect concurrent database writes.

### 2. Give repository outcomes explicit types (`T05.1`)

- [ ] Model created, repeated and conflict results as a union. Show one pure HTTP mapping function and explain where a Map can help a practice lookup and where the database must remain authoritative. Add tests for each outcome.

**Primary path:** `students/<student-id>/week-07/typescript/repository-results.ts`.

**Proof for review:** The caller must handle every result variant. A note compares linear array lookup with a keyed lookup without invented benchmark claims.

**Known trap:** Do not add advanced generics or classes without a useful substitution boundary.

### 3. Add filtering and stable pagination (`B04.1`)

- [ ] Implement kind filtering plus limit 1-50 and non-negative offset. Order by received_at DESC, id DESC. Include merchant scope in the repository interface even though real principals arrive next. Test ties, no results and invalid bounds.

**Primary path:** `students/<student-id>/week-07/api/list-events.ts`.

**Proof for review:** Repeated reads of unchanged data have stable order and no page exceeds 50 rows.

**Known trap:** Offset pagination can shift when new rows arrive; document that limitation instead of promising snapshot paging.

## Shared contribution

Assigned task owners contribute reviewed work to `shared/database/migrations/002-event-identity.sql, shared/api/src/repository.ts and shared/api/src/routes/events.ts`. Record the non-author review or witness in the [Week 7 contribution log](../shared/delivery/rotations/week-07.md).

## Completion checklist

- [ ] Three focused task-ID commits with the required proof
- [ ] Peer review and assigned shared task or witness work completed
- [ ] One implementation decision and failure case explained

Next: [Week 8](week-08.md).
