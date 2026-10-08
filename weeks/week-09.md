# Week 9: Enforce merchant ownership across every route

MerchantDesk | Sprint 1 | D: SQL and Persistence + B: Backend Development + C: Client Integration

## The project need

A signed-in operator must not see or write another merchant's events.

## Before you start

Seed two synthetic merchants and one operator for each. Derive merchant ownership from a verified session and current database operator, never from the request body or URL alone.

## Keep the application connected

Apply owned SQL inside the existing repository and test that same assembled app. The authenticated consumer calls the continuing server started by dev:student.

See the [application wiring guide](../docs/12-application-wiring.md) for commands and module connections.

## Outcome

A working authenticated event API with cross-merchant rejection.

## Learn and use

| Task    | Concepts and reading                                                                                                                                                                                                | Minutes |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------: |
| `D05.1` | Owner-filtered SQL, join boundaries and foreign keys. [Parameterized node-postgres queries](https://node-postgres.com/features/queries), [PostgreSQL 17 tutorial](https://www.postgresql.org/docs/17/tutorial.html) |      55 |
| `B06.1` | Authentication hooks, authorization and negative integration tests. [Fastify testing](https://fastify.dev/docs/v5.7.x/Guides/Testing/)                                                                              |      60 |
| `C02.1` | Cookie-aware HTTP consumers and safe configuration. [Using Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)                                                                           |      35 |

## Core tasks

### 1. Scope every database operation (`D05.1`)

- [ ] Apply merchant_id filters to list, detail, conflict lookup and insertion paths. Resolve an operator's current merchant in the database. For an existing event owned by another merchant return the same 404 as a missing ID. Keep duplicate keys merchant-scoped.

**Primary path:** `students/<student-id>/week-09/database/owned-queries.sql`.

**Proof for review:** Merchant A cannot read B's event even with its exact ID. Each merchant may use the same provider_event_id independently.

**Known trap:** A hidden UI button is not database authorization.

### 2. Test the protected API end to end (`B06.1`)

- [ ] Test anonymous list/read/write, A reading B's known ID, a forged merchant_id field, and a valid A write. Reject the injected owner field through body validation. Cover login/logout origins and safe error bodies. Use the existing app factory and a disposable database.

**Primary path:** `students/<student-id>/week-09/api/ownership.db.test.ts`.

**Proof for review:** 401 for anonymous, 404 for another owner's detail, 400 for forged body field, and successful own-merchant requests. No test relies only on UI behavior.

**Known trap:** Ensure Fastify does not silently strip merchant_id and make the forged request look accepted.

### 3. Update the simulator to authenticate (`C02.1`)

- [ ] Read disposable credentials from local environment variables, log in, reuse the returned cookie on one event request, and send the configured Origin. Keep passwords/cookies out of output. Do not parse combined Set-Cookie strings by splitting on commas.

**Primary path:** `students/<student-id>/week-09/client/send-authenticated.ts`.

**Proof for review:** The same script succeeds for its merchant and fails without the cookie. A witness reproduces the flow.

**Known trap:** This is a sandbox API client, not a signed payment-provider webhook integration.

## Shared contribution

Assigned task owners contribute reviewed work to `shared/api/src/routes/events.ts, shared/api/test/ownership.db.test.ts and shared/simulator/send-event.ts`. Record the non-author review or witness in the [Week 9 contribution log](../shared/delivery/rotations/week-09.md).

## Milestone: Protected merchant flow

Record this shared milestone as complete only after a non-author reproduces the outcome and records commands and results in the contribution log.

## Completion checklist

- [ ] Three focused task-ID commits with the required proof
- [ ] Peer review and assigned shared task or witness work completed
- [ ] One implementation decision and failure case explained

Next: [Week 10](week-10.md).
