# Week 9: Enforce merchant ownership across every route

MerchantDesk | Sprint 1 | D: SQL and Persistence + B: Backend Development + C: Client Integration

Read this file completely, then work through its three core tasks. Everyone follows the same tasks. Track letters describe skills, not student specialisations.

## The project need

A signed-in operator must not see or write another merchant's events.

## Before you start

Seed two synthetic merchants and one operator for each. Derive merchant ownership from a verified session and current database operator, never from the request body or URL alone.

Use the [student guide](../docs/03-student-guide.md) for commands, [resource map](../docs/07-resources.md) for bounded reading and [troubleshooting](../docs/09-troubleshooting.md) when a tool fails. Replace `<student-id>` with your assigned BE number.

## By the end you can

- Scope every database operation, and explain the result using the proof below.
- Test the protected API end to end, and explain the result using the proof below.
- Update the simulator to authenticate, and explain the result using the proof below.

The shared outcome is: A working authenticated event API with cross-merchant rejection.

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

| Task       | Learn only what this task needs                                                                                                                                                                                     | Use immediately                      | Minutes |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ | ------: |
| 1: `D05.1` | Owner-filtered SQL, join boundaries and foreign keys. [Parameterized node-postgres queries](https://node-postgres.com/features/queries), [PostgreSQL 17 tutorial](https://www.postgresql.org/docs/17/tutorial.html) | Scope every database operation       |      55 |
| 2: `B06.1` | Authentication hooks, authorization and negative integration tests. [Fastify testing](https://fastify.dev/docs/v5.7.x/Guides/Testing/)                                                                              | Test the protected API end to end    |      60 |
| 3: `C02.1` | Cookie-aware HTTP consumers and safe configuration. [Using Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)                                                                           | Update the simulator to authenticate |      35 |

## Core tasks

### 1. Scope every database operation (`D05.1`)

- [ ] Apply merchant_id filters to list, detail, conflict lookup and insertion paths. Resolve an operator's current merchant in the database. For an existing event owned by another merchant return the same 404 as a missing ID. Keep duplicate keys merchant-scoped.

**Primary commit path:** `students/<student-id>/week-09/database/owned-queries.sql`. Small companion source/tests/notes needed by this same task may be committed with it. If the path names an earlier week, continue that existing lab; do not restart it.

**Proof for review:** Merchant A cannot read B's event even with its exact ID. Each merchant may use the same provider_event_id independently.

**Known trap:** A hidden UI button is not database authorization.

### 2. Test the protected API end to end (`B06.1`)

- [ ] Test anonymous list/read/write, A reading B's known ID, a forged merchant_id field, and a valid A write. Reject the injected owner field through body validation. Cover login/logout origins and safe error bodies. Use the existing app factory and a disposable database.

**Primary commit path:** `students/<student-id>/week-09/api/ownership.db.test.ts`. Small companion source/tests/notes needed by this same task may be committed with it. If the path names an earlier week, continue that existing lab; do not restart it.

**Proof for review:** 401 for anonymous, 404 for another owner's detail, 400 for forged body field, and successful own-merchant requests. No test relies only on UI behavior.

**Known trap:** Ensure Fastify does not silently strip merchant_id and make the forged request look accepted.

### 3. Update the simulator to authenticate (`C02.1`)

- [ ] Read disposable credentials from local environment variables, log in, reuse the returned cookie on one event request, and send the configured Origin. Keep passwords/cookies out of output. Do not parse combined Set-Cookie strings by splitting on commas.

**Primary commit path:** `students/<student-id>/week-09/client/send-authenticated.ts`. Small companion source/tests/notes needed by this same task may be committed with it. If the path names an earlier week, continue that existing lab; do not restart it.

**Proof for review:** The same script succeeds for its merchant and fails without the cookie. A witness reproduces the flow.

**Known trap:** This is a sandbox API client, not a signed payment-provider webhook integration.

## Shared contribution

Only this week's build pair promotes the reviewed work into `shared/api/src/routes/events.ts, shared/api/test/ownership.db.test.ts and shared/simulator/send-event.ts`. This is a product contribution, not a permission to copy someone else's answer. Each contributor commits their own change with task IDs and a shared suffix. A non-author checks the result. Use the [rotation plan](../docs/06-team-roles.md).

## Milestone: Protected merchant flow

The group agrees the requirement and reproduces the scenario before depending on it. Record the witness and outcome in the weekly rotation log. A calendar date or a green starter test is not milestone evidence.

## End-of-week checklist

- [ ] Three focused core task commits with the exact IDs and own-folder paths
- [ ] Proof covers the stated failure cases, not only the happy path
- [ ] One peer review with a reason or useful question
- [ ] Shared pair or non-author witness/review slot completed
- [ ] No credentials, local database data, dependencies or generated build output committed
- [ ] I can explain one decision without copying a tutorial

**If time is short:** cut visual polish, extra examples and optional repetition first. Never silently remove the core proofs or this milestone. Report the concrete blocker and continue through the same essential learning path with mentor help. Extra available time is for repetition, not a different technology track.

Next: [Week 10](week-10.md).
