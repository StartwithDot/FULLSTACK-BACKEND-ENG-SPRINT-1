# Week 13: Make failures visible and requests bounded

MerchantDesk | Sprint 1 | B: Backend Development + C: Client Integration + E: Engineering and Delivery

Read this file completely, then work through its three core tasks. Everyone follows the same tasks. Track letters describe skills, not student specialisations.

## The project need

A slow database, bad request or expired session should produce a useful failure rather than a misleading demo.

## Before you start

Reuse the existing suite and GitHub workflow. Do not introduce AWS, Docker, Redis or a monitoring vendor. Native Windows remains the primary run path.

Use the [student guide](../docs/03-student-guide.md) for commands, [resource map](../docs/07-resources.md) for bounded reading and [troubleshooting](../docs/09-troubleshooting.md) when a tool fails. Replace `<student-id>` with your assigned BE number.

## Keep the application connected

Install limits, readiness and diagnostics in the same app. Run your discovered student tests and promote the reviewed modules without student-folder imports.

Read the [individual wiring guide](../docs/14-individual-app-wiring.md) for the module map and repeatable commands. This is integration guidance for the existing core tasks, not additional work.

## By the end you can

- Bound and diagnose the API, and explain the result using the proof below.
- Make the client honest during failure, and explain the result using the proof below.
- Verify the current CI gate, and explain the result using the proof below.

The shared outcome is: Bounded endpoints, redacted diagnostic logs and deliberate client errors.

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

| Task       | Learn only what this task needs                                                                                                                                                                              | Use immediately                       | Minutes |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------- | ------: |
| 1: `B09.1` | Body/query limits, timeouts, readiness and structured logs. [Fastify logging](https://fastify.dev/docs/v5.7.x/Reference/Logging/), [node-postgres pooling](https://node-postgres.com/features/pooling)       | Bound and diagnose the API            |      60 |
| 2: `C05.1` | Recoverable errors, accessible feedback and duplicate-submit prevention. [React quick start](https://react.dev/learn), [Using Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) | Make the client honest during failure |      40 |
| 3: `E10.1` | Existing checks, real DB tests and Windows/Linux portability. [GitHub Actions](https://docs.github.com/en/actions)                                                                                           | Verify the current CI gate            |      50 |

## Core tasks

### 1. Bound and diagnose the API (`B09.1`)

- [ ] Enforce the 16 KiB event body cap, bounded page/filter inputs and database connection/query timeouts. Keep liveness separate from readiness: readiness must fail when the database cannot serve a simple check. Log request ID, route, outcome and safe event ID, with cookie/auth/password/session key redaction.

**Primary commit path:** `students/<student-id>/week-13/api/operation.ts`. Small companion source/tests/notes needed by this same task may be committed with it. If the path names an earlier week, continue that existing lab; do not restart it.

**Proof for review:** Oversized body and unavailable DB have deliberate failures; a request ID traces one fault without credentials in logs.

**Known trap:** A process being alive is not evidence that it can store events. No unbounded payload logging.

### 2. Make the client honest during failure (`C05.1`)

- [ ] Exercise 401, validation failure, empty data and a stopped API. Preserve useful filter state, label errors, disable an in-flight action and offer a retry. Do not automatically retry event creation in a way that hides its identity.

**Primary commit path:** `students/<student-id>/week-10/client/src/App.tsx`. Small companion source/tests/notes needed by this same task may be committed with it. If the path names an earlier week, continue that existing lab; do not restart it.

**Proof for review:** A peer can distinguish not signed in, no matching records and a failed request; retry does not invent extra events.

**Known trap:** Do not show a success toast before checking the response.

### 3. Verify the current CI gate (`E10.1`)

- [ ] Explain the committed starter jobs and extend the database suite discovery with your actual .db.test.ts tests. The existing PostgreSQL service runs practice-fixture checks; it is not proof of product migrations. Add a product migration test and demonstrate one deliberately failing check locally and, once published, on a real PR.

**Primary commit path:** `students/<student-id>/week-13/quality/ci-proof.md`. Small companion source/tests/notes needed by this same task may be committed with it. If the path names an earlier week, continue that existing lab; do not restart it.

**Proof for review:** The required commands run from a clean install; a deliberately broken assertion/migration makes the relevant check fail.

**Known trap:** Do not make every student add a live root workflow. Practise in your folder; only the build pair promotes the shared change.

## Shared contribution

Only this week's build pair promotes the reviewed work into `shared/api/src/app.ts, shared/api/test/, shared/web/src/App.tsx and .github/workflows/checks.yml`. This is a product contribution, not a permission to copy someone else's answer. Each contributor commits their own change with task IDs and a shared suffix. A non-author checks the result. Use the [rotation plan](../docs/06-team-roles.md).

## End-of-week checklist

- [ ] Three focused core task commits with the exact IDs and own-folder paths
- [ ] Proof covers the stated failure cases, not only the happy path
- [ ] One peer review with a reason or useful question
- [ ] Shared pair or non-author witness/review slot completed
- [ ] No credentials, local database data, dependencies or generated build output committed
- [ ] I can explain one decision without copying a tutorial

**If time is short:** cut visual polish, extra examples and optional repetition first. Never silently remove the core proofs. Report the concrete blocker and continue through the same essential learning path with mentor help. Extra available time is for repetition, not a different technology track.

Next: [Week 14](week-14.md).
