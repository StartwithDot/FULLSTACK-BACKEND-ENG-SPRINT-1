# Week 7: Handle repetition and bound the list

MerchantDesk | Sprint 1 | D: SQL and Persistence + T: TypeScript and JavaScript + B: Backend Development

Read this file completely, then work through its three core tasks. Everyone follows the same tasks. Track letters describe skills, not student specialisations.

## The project need

Repeated event IDs can create duplicate records, and an unbounded list can grow without limit.

## Before you start

Keep the app local-only until the auth and ownership work is complete. Use PostgreSQL uniqueness, not a SELECT-before-INSERT assumption.

Use the [student guide](../docs/03-student-guide.md) for commands, [resource map](../docs/07-resources.md) for bounded reading and [troubleshooting](../docs/09-troubleshooting.md) when a tool fails. Replace `<student-id>` with your assigned BE number.

## Keep the application connected

Apply the identity migration through the original migration directory and import the outcome/list helpers into your existing repository/routes. Keep one list endpoint.

Read the [individual wiring guide](../docs/14-individual-app-wiring.md) for the module map and repeatable commands. This is integration guidance for the existing core tasks, not additional work.

## By the end you can

- Protect event identity in the database, and explain the result using the proof below.
- Give repository outcomes explicit types, and explain the result using the proof below.
- Add filtering and stable pagination, and explain the result using the proof below.

The shared outcome is: Database-backed duplicate behavior and a stable, bounded listing contract.

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

| Task       | Learn only what this task needs                                                                                                                                                                                                      | Use immediately                         | Minutes |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------- | ------: |
| 1: `D04.1` | Composite uniqueness, ON CONFLICT and concurrent requests. [PostgreSQL constraints](https://www.postgresql.org/docs/17/ddl-constraints.html), [PostgreSQL INSERT and conflicts](https://www.postgresql.org/docs/17/sql-insert.html)  | Protect event identity in the database  |      55 |
| 2: `T05.1` | Unions, interfaces, Map/Set basics and simple complexity reasoning. [Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html), [Everyday types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html) | Give repository outcomes explicit types |      45 |
| 3: `B04.1` | Query validation, LIMIT/OFFSET and deterministic ordering. [PostgreSQL LIMIT and OFFSET](https://www.postgresql.org/docs/17/queries-limit.html), [Parameterized node-postgres queries](https://node-postgres.com/features/queries)   | Add filtering and stable pagination     |      50 |

## Core tasks

### 1. Protect event identity in the database (`D04.1`)

- [ ] Add the unique key (merchant_id, provider_event_id) through a new migration. Define identical repeat as 200 with the existing ID, and changed content under the same identity as 409. Use an atomic insert/conflict path. Add a small test that starts two identical requests together. Keep the stated SQL artifact and include the applied forward migration as week-06/database/migrations/002-event-identity.sql in the same task commit.

**Primary commit path:** `students/<student-id>/week-07/database/deduplication.sql`. Small companion source/tests/notes needed by this same task may be committed with it. If the path names an earlier week, continue that existing lab; do not restart it.

**Proof for review:** Sequential and overlapping identical requests leave one row; the same ID with changed agreed fields returns 409 and keeps the first record.

**Known trap:** An in-process Set or pre-insert check alone does not protect concurrent database writes.

### 2. Give repository outcomes explicit types (`T05.1`)

- [ ] Model created, repeated and conflict results as a union. Show one pure HTTP mapping function and explain where a Map can help a practice lookup and where the database must remain authoritative. Add tests for each outcome.

**Primary commit path:** `students/<student-id>/week-07/typescript/repository-results.ts`. Small companion source/tests/notes needed by this same task may be committed with it. If the path names an earlier week, continue that existing lab; do not restart it.

**Proof for review:** The caller must handle every result variant. A note compares linear array lookup with a keyed lookup without invented benchmark claims.

**Known trap:** Do not add advanced generics or classes without a useful substitution boundary.

### 3. Add filtering and stable pagination (`B04.1`)

- [ ] Implement kind filtering plus limit 1-50 and non-negative offset. Order by received_at DESC, id DESC. Include merchant scope in the repository interface even though real principals arrive next. Test ties, no results and invalid bounds.

**Primary commit path:** `students/<student-id>/week-07/api/list-events.ts`. Small companion source/tests/notes needed by this same task may be committed with it. If the path names an earlier week, continue that existing lab; do not restart it.

**Proof for review:** Repeated reads of unchanged data have stable order and no page exceeds 50 rows.

**Known trap:** Offset pagination can shift when new rows arrive; document that limitation instead of promising snapshot paging.

## Shared contribution

Only this week's build pair promotes the reviewed work into `shared/database/migrations/002-event-identity.sql, shared/api/src/repository.ts and shared/api/src/routes/events.ts`. This is a product contribution, not a permission to copy someone else's answer. Each contributor commits their own change with task IDs and a shared suffix. A non-author checks the result. Use the [rotation plan](../docs/06-team-roles.md).

## End-of-week checklist

- [ ] Three focused core task commits with the exact IDs and own-folder paths
- [ ] Proof covers the stated failure cases, not only the happy path
- [ ] One peer review with a reason or useful question
- [ ] Shared pair or non-author witness/review slot completed
- [ ] No credentials, local database data, dependencies or generated build output committed
- [ ] I can explain one decision without copying a tutorial

**If time is short:** cut visual polish, extra examples and optional repetition first. Never silently remove the core proofs. Report the concrete blocker and continue through the same essential learning path with mentor help. Extra available time is for repetition, not a different technology track.

Next: [Week 8](week-08.md).
