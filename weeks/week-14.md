# Week 14: Investigate, repair and rehearse a clean start

MerchantDesk | Sprint 1 | E: Engineering and Delivery + D: SQL and Persistence

Read this file completely, then work through its three core tasks. Everyone follows the same tasks. Track letters describe skills, not student specialisations.

## The project need

The application must be maintainable when something fails and when a different person starts it.

## Before you start

Use a reversible failure only in disposable/local test data. The maintainer chooses a fixture or condition, not a destructive change to a real database.

Use the [student guide](../docs/03-student-guide.md) for commands, [resource map](../docs/07-resources.md) for bounded reading and [troubleshooting](../docs/09-troubleshooting.md) when a tool fails. Replace `<student-id>` with your assigned BE number.

## Keep the application connected

Use the continuing app's real commands in the clean-start runbook. Any new index is a forward migration in the original Week 6 directory.

Read the [individual wiring guide](../docs/14-individual-app-wiring.md) for the module map and repeatable commands. This is integration guidance for the existing core tasks, not additional work.

## By the end you can

- Break, investigate and fix one failure, and explain the result using the proof below.
- Explain one index from the query, and explain the result using the proof below.
- Rehearse the clean-start handover, and explain the result using the proof below.

The shared outcome is: An evidence-led repair, an explained query plan and a corrected runbook.

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

| Task       | Learn only what this task needs                                                                                                                                                               | Use immediately                        | Minutes |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- | ------: |
| 1: `E11.1` | Evidence-led debugging and regression tests. [Fastify logging](https://fastify.dev/docs/v5.7.x/Reference/Logging/), [Node 22 test runner](https://nodejs.org/docs/latest-v22.x/api/test.html) | Break, investigate and fix one failure |      60 |
| 2: `D07.1` | EXPLAIN, filter/order alignment and measurement limits. [PostgreSQL EXPLAIN](https://www.postgresql.org/docs/17/using-explain.html)                                                           | Explain one index from the query       |      45 |
| 3: `E11.2` | Setup instructions, fresh state and reproducibility. [GitHub reviews](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests)           | Rehearse the clean-start handover      |      45 |

## Core tasks

### 1. Break, investigate and fix one failure (`E11.1`)

- [ ] Investigate one local failure such as a wrong DB URL, missing owner filter, unhandled SQL conflict or stale UI result. Record evidence and wrong guesses before changing code. Add a failing regression test, fix the cause and write a brief blameless postmortem.

**Primary commit path:** `students/<student-id>/week-14/incident/postmortem.md`. Small companion source/tests/notes needed by this same task may be committed with it. If the path names an earlier week, continue that existing lab; do not restart it.

**Proof for review:** Your evidence identifies the cause and a regression test catches the original bug.

**Known trap:** Never inject failures into another person's database or loosen validation until a test goes green.

### 2. Explain one index from the query (`D07.1`)

- [ ] Inspect the merchant list query with EXPLAIN on synthetic rows. Propose a supporting merchant/time/ID index and compare plans before/after on a suitable fixture size. Add it through a new migration if justified. Say why a tiny table may use a sequential scan correctly.

**Primary commit path:** `students/<student-id>/week-14/database/query-plan.sql`. Small companion source/tests/notes needed by this same task may be committed with it. If the path names an earlier week, continue that existing lab; do not restart it.

**Proof for review:** The index proposal matches actual filters/order and the explanation does not claim a measured speedup without evidence.

**Known trap:** An index is not automatically better for every table or write-heavy operation.

### 3. Rehearse the clean-start handover (`E11.2`)

- [ ] Give a peer the repository and current runbook. Use a fresh named disposable database and npm ci. Watch them start API/UI, migrate, seed and send a fixture without verbal shortcuts. Record and fix confusing instructions.

**Primary commit path:** `students/<student-id>/week-14/delivery/clean-start-notes.md`. Small companion source/tests/notes needed by this same task may be committed with it. If the path names an earlier week, continue that existing lab; do not restart it.

**Proof for review:** A non-author gets to the protected event screen using written commands; missing steps are corrected.

**Known trap:** Do not delete or reset a personal or shared database to make the rehearsal look clean.

## Shared contribution

Only this week's build pair promotes the reviewed work into `shared/delivery/incident.md, shared/database/migrations/ and shared/delivery/runbook.md`. This is a product contribution, not a permission to copy someone else's answer. Each contributor commits their own change with task IDs and a shared suffix. A non-author checks the result. Use the [rotation plan](../docs/06-team-roles.md).

## End-of-week checklist

- [ ] Three focused core task commits with the exact IDs and own-folder paths
- [ ] Proof covers the stated failure cases, not only the happy path
- [ ] One peer review with a reason or useful question
- [ ] Shared pair or non-author witness/review slot completed
- [ ] No credentials, local database data, dependencies or generated build output committed
- [ ] I can explain one decision without copying a tutorial

**If time is short:** cut visual polish, extra examples and optional repetition first. Never silently remove the core proofs. Report the concrete blocker and continue through the same essential learning path with mentor help. Extra available time is for repetition, not a different technology track.

Next: [Week 15](week-15.md).
