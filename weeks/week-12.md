# Week 12: Consolidate correctness before adding polish

MerchantDesk | Sprint 1 | D: SQL and Persistence + B: Backend Development + E: Engineering and Delivery

Read this file completely, then work through its three core tasks. Everyone follows the same tasks. Track letters describe skills, not student specialisations.

## The project need

The happy-path demo works, but duplicates, transactions and regressions need trustworthy checks.

## Before you start

This is a consolidation week with no new framework. Use earlier labs and their failing tests; retain all essential ownership and validation checks.

Use the [student guide](../docs/03-student-guide.md) for commands, [resource map](../docs/07-resources.md) for bounded reading and [troubleshooting](../docs/09-troubleshooting.md) when a tool fails. Replace `<student-id>` with your assigned BE number.

## By the end you can

- Exercise rollback on one checked-out client, and explain the result using the proof below.
- Strengthen a weak boundary test, and explain the result using the proof below.
- Map requirements to evidence and revise, and explain the result using the proof below.

The shared outcome is: A coherent test matrix, one exercised transaction and corrected weak cases.

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

| Task       | Learn only what this task needs                                                                                                                                                                                    | Use immediately                             | Minutes |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------- | ------: |
| 1: `D06.1` | Transactions, rollback, client release and isolated state. [node-postgres transactions](https://node-postgres.com/features/transactions)                                                                           | Exercise rollback on one checked-out client |      50 |
| 2: `B08.1` | Adversarial cases, timestamps, amount bounds and conflict semantics. [Fastify testing](https://fastify.dev/docs/v5.7.x/Guides/Testing/), [Node 22 test runner](https://nodejs.org/docs/latest-v22.x/api/test.html) | Strengthen a weak boundary test             |      60 |
| 3: `E09.1` | Risk-based tests, explain-back and focused revision. [GitHub reviews](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests)                                | Map requirements to evidence and revise     |      40 |

## Core tasks

### 1. Exercise rollback on one checked-out client (`D06.1`)

- [ ] In a disposable test namespace, perform two related writes, deliberately fail the second and prove the first was rolled back. Use one checked-out client, BEGIN/COMMIT/ROLLBACK and finally release. Explain why a single event insert does not need an artificial multi-step transaction.

**Primary commit path:** `students/<student-id>/week-12/database/rollback.ts`. Small companion source/tests/notes needed by this same task may be committed with it. If the path names an earlier week, continue that existing lab; do not restart it.

**Proof for review:** The deliberate failure leaves no partial first write and the pool remains usable afterward.

**Known trap:** Do not hold a database transaction around a network request.

### 2. Strengthen a weak boundary test (`B08.1`)

- [ ] Choose the weakest core API boundary and add a test that exposes it: amount coercion, impossible date, equal timestamp paging, changed duplicate content or cross-owner lookup. Fix the bug, then rerun the whole current suite. Improve parsing without loosening the agreed field contract.

**Primary commit path:** `students/<student-id>/week-12/api/boundary.db.test.ts`. Small companion source/tests/notes needed by this same task may be committed with it. If the path names an earlier week, continue that existing lab; do not restart it.

**Proof for review:** Your added test fails before the fix and passes afterward; the existing core checks remain green.

**Known trap:** A test relying on whichever row happens to come first is not stable.

### 3. Map requirements to evidence and revise (`E09.1`)

- [ ] Map each V1 behavior to a unit, HTTP, real-database or browser check. Identify one missing proof, add it or explain the remaining limit. Revisit a Week 2/3 concept from memory, then correct your explanation against the code.

**Primary commit path:** `students/<student-id>/week-12/quality/test-matrix.md`. Small companion source/tests/notes needed by this same task may be committed with it. If the path names an earlier week, continue that existing lab; do not restart it.

**Proof for review:** Every milestone behavior has a named check and your revision records a real correction.

**Known trap:** Coverage percentages and green starter tests do not prove the completed merchant features.

## Shared contribution

Only this week's build pair promotes the reviewed work into `shared/api/test/, shared/database/README.md and shared/delivery/test-matrix.md`. This is a product contribution, not a permission to copy someone else's answer. Each contributor commits their own change with task IDs and a shared suffix. A non-author checks the result. Use the [rotation plan](../docs/06-team-roles.md).

## End-of-week checklist

- [ ] Three focused core task commits with the exact IDs and own-folder paths
- [ ] Proof covers the stated failure cases, not only the happy path
- [ ] One peer review with a reason or useful question
- [ ] Shared pair or non-author witness/review slot completed
- [ ] No credentials, local database data, dependencies or generated build output committed
- [ ] I can explain one decision without copying a tutorial

**If time is short:** cut visual polish, extra examples and optional repetition first. Never silently remove the core proofs. Report the concrete blocker and continue through the same essential learning path with mentor help. Extra available time is for repetition, not a different technology track.

Next: [Week 13](week-13.md).
