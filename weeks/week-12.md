# Week 12: Consolidate correctness before adding polish

MerchantDesk | Sprint 1 | D: SQL and Persistence + B: Backend Development + E: Engineering and Delivery

## The project need

The happy-path demo works, but duplicates, transactions and regressions need trustworthy checks.

## Before you start

This is a consolidation week with no new framework. Use earlier labs and their failing tests; retain all essential ownership and validation checks.

## Keep the application connected

All new regression tests import the same Week 4 factory and inject isolated repository dependencies. Do not validate a disconnected demonstration instead of the continuing app.

See the [application wiring guide](../docs/12-application-wiring.md) for commands and module connections.

## Outcome

A coherent test matrix, one exercised transaction and corrected weak cases.

## Learn and use

| Task    | Concepts and reading                                                                                                                                                                                               | Minutes |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------: |
| `D06.1` | Transactions, rollback, client release and isolated state. [node-postgres transactions](https://node-postgres.com/features/transactions)                                                                           |      50 |
| `B08.1` | Adversarial cases, timestamps, amount bounds and conflict semantics. [Fastify testing](https://fastify.dev/docs/v5.7.x/Guides/Testing/), [Node 22 test runner](https://nodejs.org/docs/latest-v22.x/api/test.html) |      60 |
| `E09.1` | Risk-based tests, explain-back and focused revision. [Assessment and review](../docs/10-assessment.md)                                                                                                             |      40 |

## Core tasks

### 1. Exercise rollback on one checked-out client (`D06.1`)

- [ ] In a disposable test namespace, perform two related writes, deliberately fail the second and prove the first was rolled back. Use one checked-out client, BEGIN/COMMIT/ROLLBACK and finally release. Explain why a single event insert does not need an artificial multi-step transaction.

**Primary path:** `students/<student-id>/week-12/database/rollback.ts`.

**Proof for review:** The deliberate failure leaves no partial first write and the pool remains usable afterward.

**Known trap:** Do not hold a database transaction around a network request.

### 2. Strengthen a weak boundary test (`B08.1`)

- [ ] Choose the weakest core API boundary and add a test that exposes it: amount coercion, impossible date, equal timestamp paging, changed duplicate content or cross-owner lookup. Fix the bug, then rerun the whole current suite. Improve parsing without loosening the agreed field contract.

**Primary path:** `students/<student-id>/week-12/api/boundary.db.test.ts`.

**Proof for review:** Your added test fails before the fix and passes afterward; the existing core checks remain green.

**Known trap:** A test relying on whichever row happens to come first is not stable.

### 3. Map requirements to evidence and revise (`E09.1`)

- [ ] Map each V1 behavior to a unit, HTTP, real-database or browser check. Identify one missing proof, add it or explain the remaining limit. Revisit a Week 2/3 concept from memory, then correct your explanation against the code.

**Primary path:** `students/<student-id>/week-12/quality/test-matrix.md`.

**Proof for review:** Every milestone behavior has a named check and your revision records a real correction.

**Known trap:** Coverage percentages and green starter tests do not prove the completed merchant features.

## Shared contribution

Assigned task owners contribute reviewed work to `shared/api/test/, shared/database/README.md and shared/delivery/test-matrix.md`. Record the non-author review or witness in the [Week 12 contribution log](../shared/delivery/rotations/week-12.md).

## Completion checklist

- [ ] Three focused task-ID commits with the required proof
- [ ] Peer review and assigned shared task or witness work completed
- [ ] One implementation decision and failure case explained

Next: [Week 13](week-13.md).
