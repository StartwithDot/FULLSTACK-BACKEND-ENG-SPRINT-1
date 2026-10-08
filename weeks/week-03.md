# Week 3: Functions, relational boundaries and first tests

MerchantDesk | Sprint 1 | T: TypeScript and JavaScript + D: SQL and Persistence + E: Engineering and Delivery

## The project need

The event contract must become reusable checks, and events must remain attached to a real merchant.

## Before you start

Bring the Week 2 contract and a loaded practice database. Use the fixture cases instead of searching for external data.

## Outcome

A reusable validation exercise, a relational model and tests that detect a bug.

## Learn and use

| Task    | Concepts and reading                                                                                                                                                                                                                                                                     | Minutes |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------: |
| `T03.1` | Functions, unknown, narrowing, return values and modules. [Functions](https://www.typescriptlang.org/docs/handbook/2/functions.html), [Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html), [Modules](https://www.typescriptlang.org/docs/handbook/2/modules.html) |      55 |
| `D02.1` | Primary keys, foreign keys, joins, required fields and constraints. [PostgreSQL constraints](https://www.postgresql.org/docs/17/ddl-constraints.html), [PostgreSQL 17 tutorial](https://www.postgresql.org/docs/17/tutorial.html)                                                        |      50 |
| `E03.1` | node:test, assertions, test cases and focused debugging. [Node 22 test runner](https://nodejs.org/docs/latest-v22.x/api/test.html)                                                                                                                                                       |      45 |

## Core tasks

### 1. Validate a small unknown input (`T03.1`)

- [ ] Write a pure function that accepts unknown and returns either a small valid event or explicit issues. Handle null, wrong kinds and non-integer/out-of-range amounts. Keep validation separate from printing. Focus on the agreed subset; full route JSON Schema comes in Week 5.

**Primary path:** `students/<student-id>/week-03/typescript/validate-event.ts`.

**Proof for review:** Valid fixture records pass and bad amount, missing ID, null and unknown kind produce errors without a crash.

**Known trap:** An as Event assertion changes the compiler's view, not the received data.

### 2. Model and test the relationship (`D02.1`)

- [ ] Draw merchants and events with one-row meanings. In a new schema inside your practice database, create a small pair of related tables and try a broken foreign key and a duplicate primary key. Join events to merchant names and explain unmatched rows.

**Primary path:** `students/<student-id>/week-03/sql/relationships.sql`.

**Proof for review:** The database rejects the deliberate relational mistakes; your join result is explained in NOTES.md.

**Known trap:** Do not edit or destroy another student's data. The final shared migration is written in Week 6.

### 3. Prove and break the validator (`E03.1`)

- [ ] Add at least four tests, including one bad input. Run npm run test:practice -- followed by this test path. Deliberately remove a check, observe a failing test and restore it. Link one peer review.

**Primary path:** `students/<student-id>/week-03/typescript/validate-event.test.ts`.

**Proof for review:** A recorded test fails for the introduced bug and passes after restoration.

**Known trap:** A green run without an assertion does not prove validation.

## Shared contribution

The build pair promotes reviewed work into `shared/delivery/data-model.md and shared/api/test/contract.test.ts`. Record the non-author review or witness in the [Week 3 rotation log](../shared/delivery/rotations/week-03.md).

## Completion checklist

- [ ] Three focused task-ID commits with the required proof
- [ ] Peer review and assigned shared-build or witness work completed
- [ ] One implementation decision and failure case explained

Next: [Week 4](week-04.md).
