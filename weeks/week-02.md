# Week 2: Represent events and ask the first SQL questions

MerchantDesk | Sprint 1 | T: TypeScript and JavaScript + D: SQL and Persistence + E: Engineering and Delivery

## The project need

The merchant needs event counts, while fields such as amounts and event kinds need an agreed meaning.

## Before you start

Bring Week 1's inspector. Install PostgreSQL using setup sections 4-5 and load fixtures/practice.sql into your personal practice database. The fixture is supplied now, not promised by a later week.

## Outcome

Typed event data, real SQL answers and an explicit input contract.

## Learn and use

| Task    | Concepts and reading                                                                                                                                                                                                                   | Minutes |
| ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------: |
| `T02.1` | Primitive types, arrays, object types, branches and iteration. [Everyday types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html), [JavaScript guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide) |      50 |
| `D01.1` | Tables, rows, SELECT, WHERE, ORDER BY and GROUP BY. [PostgreSQL 17 tutorial](https://www.postgresql.org/docs/17/tutorial.html)                                                                                                         |      65 |
| `E02.1` | Runtime input, integer minor units, timestamps and non-goals. [MerchantDesk API contract](../docs/04-api-and-security-contract.md)                                                                                                     |      35 |

## Core tasks

### 1. Work with a typed event list (`T02.1`)

- [ ] Define an event type using the actual fixture fields. Iterate over several events, select captured payments and count them. Compare a loop with filter. Explain one case where a missing value differs from zero.

**Primary path:** `students/<student-id>/week-02/typescript/event-list.ts`.

**Proof for review:** The captured count matches the fixture and an intentionally wrong assignment is rejected by TypeScript.

**Known trap:** Type annotations do not validate JSON received from another process.

### 2. Load and query the practice database (`D01.1`)

- [ ] Load the supplied SQL using the setup guide, then write queries for captured events, merchant totals and the latest events. Put answers and commands in NOTES.md. This is a personal practice database, not the shared final schema.

**Primary path:** `students/<student-id>/week-02/sql/first-queries.sql`.

**Proof for review:** Queries return real rows from the supplied fixture, including both merchants. State what one row means.

**Known trap:** Install time belongs inside this task's budget. Ask for setup help instead of borrowing a personal database.

### 3. Agree the event field rules (`E02.1`)

- [ ] Use docs/01-project-brief.md and fixtures/cases.json to specify required fields, bounds, allowed event kinds and the duplicate key. Explain why merchant identity will eventually come from authentication, not an arbitrary body field.

**Primary path:** `students/<student-id>/week-02/design/event-contract.md`.

**Proof for review:** Every fixture case has an expected accept/reject result and a reason. Money is expressed in integer paise, not floating point rupees.

**Known trap:** Sandbox event data is not authorization and this course does not process payments.

## Shared contribution

The build pair promotes reviewed work into `shared/delivery/event-contract.md and shared/database/practice-notes.md`. Record the non-author review or witness in the [Week 2 rotation log](../shared/delivery/rotations/week-02.md).

## Completion checklist

- [ ] Three focused task-ID commits with the required proof
- [ ] Peer review and assigned shared-build or witness work completed
- [ ] One implementation decision and failure case explained

Next: [Week 3](week-03.md).
