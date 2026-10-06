# Week 2: Represent events and ask the first SQL questions

MerchantDesk | Sprint 1 | T: TypeScript and JavaScript + D: SQL and Persistence + E: Engineering and Delivery

Read this file completely, then work through its three core tasks. Everyone follows the same tasks. Track letters describe skills, not student specialisations.

## The project need

The merchant needs event counts, while fields such as amounts and event kinds need an agreed meaning.

## Before you start

Bring Week 1's inspector. Install PostgreSQL using setup sections 4-5 and load fixtures/practice.sql into your personal practice database. The fixture is supplied now, not promised by a later week.

Use the [student guide](../docs/03-student-guide.md) for commands, [resource map](../docs/07-resources.md) for bounded reading and [troubleshooting](../docs/09-troubleshooting.md) when a tool fails. Replace `<student-id>` with your assigned BE number.

## By the end you can

- Work with a typed event list, and explain the result using the proof below.
- Load and query the practice database, and explain the result using the proof below.
- Agree the event field rules, and explain the result using the proof below.

The shared outcome is: Typed event data, real SQL answers and an explicit input contract.

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

| Task       | Learn only what this task needs                                                                                                                                                                                                        | Use immediately                      | Minutes |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ | ------: |
| 1: `T02.1` | Primitive types, arrays, object types, branches and iteration. [Everyday types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html), [JavaScript guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide) | Work with a typed event list         |      50 |
| 2: `D01.1` | Tables, rows, SELECT, WHERE, ORDER BY and GROUP BY. [PostgreSQL 17 tutorial](https://www.postgresql.org/docs/17/tutorial.html)                                                                                                         | Load and query the practice database |      65 |
| 3: `E02.1` | Runtime input, integer minor units, timestamps and non-goals. [Everyday types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)                                                                                     | Agree the event field rules          |      35 |

## Core tasks

### 1. Work with a typed event list (`T02.1`)

- [ ] Define an event type using the actual fixture fields. Iterate over several events, select captured payments and count them. Compare a loop with filter. Explain one case where a missing value differs from zero.

**Primary commit path:** `students/<student-id>/week-02/typescript/event-list.ts`. Small companion source/tests/notes needed by this same task may be committed with it. If the path names an earlier week, continue that existing lab; do not restart it.

**Proof for review:** The captured count matches the fixture and an intentionally wrong assignment is rejected by TypeScript.

**Known trap:** Type annotations do not validate JSON received from another process.

### 2. Load and query the practice database (`D01.1`)

- [ ] Load the supplied SQL using the setup guide, then write queries for captured events, merchant totals and the latest events. Put answers and commands in NOTES.md. This is a personal practice database, not the shared final schema.

**Primary commit path:** `students/<student-id>/week-02/sql/first-queries.sql`. Small companion source/tests/notes needed by this same task may be committed with it. If the path names an earlier week, continue that existing lab; do not restart it.

**Proof for review:** Queries return real rows from the supplied fixture, including both merchants. State what one row means.

**Known trap:** Install time belongs inside this task's budget. Ask for setup help instead of borrowing a personal database.

### 3. Agree the event field rules (`E02.1`)

- [ ] Use docs/01-project-brief.md and fixtures/cases.json to specify required fields, bounds, allowed event kinds and the duplicate key. Explain why merchant identity will eventually come from authentication, not an arbitrary body field.

**Primary commit path:** `students/<student-id>/week-02/design/event-contract.md`. Small companion source/tests/notes needed by this same task may be committed with it. If the path names an earlier week, continue that existing lab; do not restart it.

**Proof for review:** Every fixture case has an expected accept/reject result and a reason. Money is expressed in integer paise, not floating point rupees.

**Known trap:** Sandbox event data is not authorization and this course does not process payments.

## Shared contribution

Only this week's build pair promotes the reviewed work into `shared/delivery/event-contract.md and shared/database/practice-notes.md`. This is a product contribution, not a permission to copy someone else's answer. Each contributor commits their own change with task IDs and a shared suffix. A non-author checks the result. Use the [rotation plan](../docs/06-team-roles.md).

## End-of-week checklist

- [ ] Three focused core task commits with the exact IDs and own-folder paths
- [ ] Proof covers the stated failure cases, not only the happy path
- [ ] One peer review with a reason or useful question
- [ ] Shared pair or non-author witness/review slot completed
- [ ] No credentials, local database data, dependencies or generated build output committed
- [ ] I can explain one decision without copying a tutorial

**If time is short:** cut visual polish, extra examples and optional repetition first. Never silently remove the core proofs. Report the concrete blocker and continue through the same essential learning path with mentor help. Extra available time is for repetition, not a different technology track.

Next: [Week 3](week-03.md).
