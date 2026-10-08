# Week 14: Investigate, repair and rehearse a clean start

MerchantDesk | Sprint 1 | E: Engineering and Delivery + D: SQL and Persistence

## The project need

The application must be maintainable when something fails and when a different person starts it.

## Before you start

Use a reversible failure only in disposable/local test data. The maintainer chooses a fixture or condition, not a destructive change to a real database.

## Keep the application connected

Use the continuing app's real commands in the clean-start runbook. Any new index is a forward migration in the original Week 6 directory.

See the [application wiring guide](../docs/12-application-wiring.md) for commands and module connections.

## Outcome

An evidence-led repair, an explained query plan and a corrected runbook.

## Learn and use

| Task    | Concepts and reading                                                                                                                                                                          | Minutes |
| ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------: |
| `E11.1` | Evidence-led debugging and regression tests. [Fastify logging](https://fastify.dev/docs/v5.7.x/Reference/Logging/), [Node 22 test runner](https://nodejs.org/docs/latest-v22.x/api/test.html) |      60 |
| `D07.1` | EXPLAIN, filter/order alignment and measurement limits. [PostgreSQL EXPLAIN](https://www.postgresql.org/docs/17/using-explain.html)                                                           |      45 |
| `E11.2` | Setup instructions, fresh state and reproducibility. [Windows setup](../docs/02-windows-setup.md)                                                                                             |      45 |

## Core tasks

### 1. Break, investigate and fix one failure (`E11.1`)

- [ ] Investigate one local failure such as a wrong DB URL, missing owner filter, unhandled SQL conflict or stale UI result. Record evidence and wrong guesses before changing code. Add a failing regression test, fix the cause and write a brief blameless postmortem.

**Primary path:** `students/<student-id>/week-14/incident/postmortem.md`.

**Proof for review:** Your evidence identifies the cause and a regression test catches the original bug.

**Known trap:** Never inject failures into another person's database or loosen validation until a test goes green.

### 2. Explain one index from the query (`D07.1`)

- [ ] Inspect the merchant list query with EXPLAIN on synthetic rows. Propose a supporting merchant/time/ID index and compare plans before/after on a suitable fixture size. Add it through a new migration if justified. Say why a tiny table may use a sequential scan correctly.

**Primary path:** `students/<student-id>/week-14/database/query-plan.sql`.

**Proof for review:** The index proposal matches actual filters/order and the explanation does not claim a measured speedup without evidence.

**Known trap:** An index is not automatically better for every table or write-heavy operation.

### 3. Rehearse the clean-start handover (`E11.2`)

- [ ] Draft week-15/delivery/runbook.md from your existing NOTES.md and wiring instructions, then give a peer the repository and that runbook. Use a fresh named disposable database and npm ci. Watch them migrate, seed, start API/UI and send a fixture without verbal shortcuts. Record and fix confusing instructions; continue the same runbook in Week 15.

**Primary path:** `students/<student-id>/week-14/delivery/clean-start-notes.md`.

**Proof for review:** A non-author gets to the protected event screen using written commands; missing steps are corrected.

**Known trap:** Do not delete or reset a personal or shared database to make the rehearsal look clean.

## Shared contribution

The build pair promotes reviewed work into `shared/delivery/incident.md, shared/database/migrations/ and shared/delivery/runbook.md`. Record the non-author review or witness in the [Week 14 rotation log](../shared/delivery/rotations/week-14.md).

## Completion checklist

- [ ] Three focused task-ID commits with the required proof
- [ ] Peer review and assigned shared-build or witness work completed
- [ ] One implementation decision and failure case explained

Next: [Week 15](week-15.md).
