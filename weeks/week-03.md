# Week 3: Functions, relational boundaries and first tests

MerchantDesk | Sprint 1 | T: TypeScript and JavaScript + D: SQL and Persistence + E: Engineering and Delivery

Read this file completely, then work through its three core tasks. Everyone follows the same tasks. Track letters describe skills, not student specialisations.

## The project need

The event contract must become reusable checks, and events must remain attached to a real merchant.

## Before you start

Bring the Week 2 contract and a loaded practice database. Use the fixture cases instead of searching for external data.

Use the [student guide](../docs/03-student-guide.md) for commands, [resource map](../docs/07-resources.md) for bounded reading and [troubleshooting](../docs/09-troubleshooting.md) when a tool fails. Replace `<student-id>` with your assigned BE number.

## By the end you can

- Validate a small unknown input, and explain the result using the proof below.
- Model and test the relationship, and explain the result using the proof below.
- Prove and break the validator, and explain the result using the proof below.

The shared outcome is: A reusable validation exercise, a relational model and tests that detect a bug.

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

| Task       | Learn only what this task needs                                                                                                                                                                                                                                                          | Use immediately                 | Minutes |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- | ------: |
| 1: `T03.1` | Functions, unknown, narrowing, return values and modules. [Functions](https://www.typescriptlang.org/docs/handbook/2/functions.html), [Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html), [Modules](https://www.typescriptlang.org/docs/handbook/2/modules.html) | Validate a small unknown input  |      55 |
| 2: `D02.1` | Primary keys, foreign keys, joins, required fields and constraints. [PostgreSQL constraints](https://www.postgresql.org/docs/17/ddl-constraints.html), [PostgreSQL 17 tutorial](https://www.postgresql.org/docs/17/tutorial.html)                                                        | Model and test the relationship |      50 |
| 3: `E03.1` | node:test, assertions, test cases and focused debugging. [Node 22 test runner](https://nodejs.org/docs/latest-v22.x/api/test.html)                                                                                                                                                       | Prove and break the validator   |      45 |

## Core tasks

### 1. Validate a small unknown input (`T03.1`)

- [ ] Write a pure function that accepts unknown and returns either a small valid event or explicit issues. Handle null, wrong kinds and non-integer/out-of-range amounts. Keep validation separate from printing. Focus on the agreed subset; full route JSON Schema comes in Week 5.

**Primary commit path:** `students/<student-id>/week-03/typescript/validate-event.ts`. Small companion source/tests/notes needed by this same task may be committed with it. If the path names an earlier week, continue that existing lab; do not restart it.

**Proof for review:** Valid fixture records pass and bad amount, missing ID, null and unknown kind produce errors without a crash.

**Known trap:** An as Event assertion changes the compiler's view, not the received data.

### 2. Model and test the relationship (`D02.1`)

- [ ] Draw merchants and events with one-row meanings. In a new schema inside your practice database, create a small pair of related tables and try a broken foreign key and a duplicate primary key. Join events to merchant names and explain unmatched rows.

**Primary commit path:** `students/<student-id>/week-03/sql/relationships.sql`. Small companion source/tests/notes needed by this same task may be committed with it. If the path names an earlier week, continue that existing lab; do not restart it.

**Proof for review:** The database rejects the deliberate relational mistakes; your join result is explained in NOTES.md.

**Known trap:** Do not edit or destroy another student's data. The final shared migration is written in Week 6.

### 3. Prove and break the validator (`E03.1`)

- [ ] Add at least four tests, including one bad input. Run npm run test:practice -- followed by this test path. Deliberately remove a check, observe a failing test and restore it. Link one peer review.

**Primary commit path:** `students/<student-id>/week-03/typescript/validate-event.test.ts`. Small companion source/tests/notes needed by this same task may be committed with it. If the path names an earlier week, continue that existing lab; do not restart it.

**Proof for review:** A recorded test fails for the introduced bug and passes after restoration.

**Known trap:** A green run without an assertion does not prove validation.

## Shared contribution

Only this week's build pair promotes the reviewed work into `shared/delivery/data-model.md and shared/api/test/contract.test.ts`. This is a product contribution, not a permission to copy someone else's answer. Each contributor commits their own change with task IDs and a shared suffix. A non-author checks the result. Use the [rotation plan](../docs/06-team-roles.md).

## End-of-week checklist

- [ ] Three focused core task commits with the exact IDs and own-folder paths
- [ ] Proof covers the stated failure cases, not only the happy path
- [ ] One peer review with a reason or useful question
- [ ] Shared pair or non-author witness/review slot completed
- [ ] No credentials, local database data, dependencies or generated build output committed
- [ ] I can explain one decision without copying a tutorial

**If time is short:** cut visual polish, extra examples and optional repetition first. Never silently remove the core proofs. Report the concrete blocker and continue through the same essential learning path with mentor help. Extra available time is for repetition, not a different technology track.

Next: [Week 4](week-04.md).
