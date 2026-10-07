# Week 4: Cross the HTTP boundary without losing the model

MerchantDesk | Sprint 1 | B: Backend Development + T: TypeScript and JavaScript + E: Engineering and Delivery

Read this file completely, then work through its three core tasks. Everyone follows the same tasks. Track letters describe skills, not student specialisations.

## The project need

Another program must send or request events without sharing the API's memory.

## Before you start

Read the HTTP contract in docs/04-api-and-security-contract.md. PostgreSQL practice and TypeScript exercises continue; do not replace them with a standalone framework course.

Use the [student guide](../docs/03-student-guide.md) for commands, [resource map](../docs/07-resources.md) for bounded reading and [troubleshooting](../docs/09-troubleshooting.md) when a tool fails. Replace `<student-id>` with your assigned BE number.

## Keep the application connected

Start your continuing individual API as described in docs/14-individual-app-wiring.md: copy the immutable api-starter once, then retain week-04/api/app.ts and server.ts as the factory/listener.

Read the [individual wiring guide](../docs/14-individual-app-wiring.md) for the module map and repeatable commands. This is integration guidance for the existing core tasks, not additional work.

## By the end you can

- Build and inspect a tiny Fastify API, and explain the result using the proof below.
- Observe async work and failure, and explain the result using the proof below.
- Review the API and schema together, and explain the result using the proof below.

The shared outcome is: A tiny HTTP application, observable async behavior and an API plan.

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

| Task       | Learn only what this task needs                                                                                                                                                                                                                                                                   | Use immediately                      | Minutes |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ | ------: |
| 1: `B01.1` | HTTP methods, paths, headers, status, JSON and app factories. [HTTP overview](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview), [Fastify getting started](https://fastify.dev/docs/v5.7.x/Guides/Getting-Started/), [Fastify testing](https://fastify.dev/docs/v5.7.x/Guides/Testing/) | Build and inspect a tiny Fastify API |      60 |
| 2: `T04.1` | Promises, await, try/catch, JSON parsing and cleanup. [Using promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)                                                                                                                                              | Observe async work and failure       |      50 |
| 3: `E04.1` | Request/response contracts and design trade-offs. [HTTP overview](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview)                                                                                                                                                                     | Review the API and schema together   |      40 |

## Core tasks

### 1. Build and inspect a tiny Fastify API (`B01.1`)

- [ ] Copy the immutable fixtures/api-starter once into your week-04/api folder as described in docs/14-individual-app-wiring.md. Continue its exported createApp factory and separate server.ts listener. Add an in-memory GET /api/events returning a few synthetic records, send a request with curl.exe and add an app.inject test in app.test.ts. Run the app with npm.cmd run dev:student -- BE01, replacing BE01. Bind to loopback and retain this entry point in later weeks.

**Primary commit path:** `students/<student-id>/week-04/api/app.ts`. Small companion source/tests/notes needed by this same task may be committed with it. If the path names an earlier week, continue that existing lab; do not restart it.

**Proof for review:** An annotated exchange names method, URL, response status and JSON. The test runs without opening a network port.

**Known trap:** The in-memory lab is local and temporary. It has no authentication yet and must not be publicly exposed.

### 2. Observe async work and failure (`T04.1`)

- [ ] Read the supplied fixture with node:fs/promises. Compare an awaited result with the Promise itself. Handle a missing file and malformed JSON deliberately; pass parsed data through the earlier checks. Explain why async is not a new thread for each request.

**Primary commit path:** `students/<student-id>/week-04/typescript/async-reader.ts`. Small companion source/tests/notes needed by this same task may be committed with it. If the path names an earlier week, continue that existing lab; do not restart it.

**Proof for review:** Successful and failing runs terminate with useful, safe messages. A parsing failure is not mistaken for an empty event list.

**Known trap:** Catch only what you can explain; do not catch every error and return success.

### 3. Review the API and schema together (`E04.1`)

- [ ] Specify the initial POST/list/detail routes, field rules, error shape and the future owner filter. Draw the request path and name the limits of the in-memory version. Compare the plan with Week 3's relational model.

**Primary commit path:** `students/<student-id>/week-04/design/api-contract.md`. Small companion source/tests/notes needed by this same task may be committed with it. If the path names an earlier week, continue that existing lab; do not restart it.

**Proof for review:** A peer can name what belongs in HTTP, validation and persistence, and what is missing before public deployment.

**Known trap:** Do not invent queue, Rust service or microservice boundaries in Sprint 1.

## Shared contribution

Only this week's build pair promotes the reviewed work into `shared/api/src/app.ts and shared/delivery/api-contract.md`. This is a product contribution, not a permission to copy someone else's answer. Each contributor commits their own change with task IDs and a shared suffix. A non-author checks the result. Use the [rotation plan](../docs/06-team-roles.md).

## End-of-week checklist

- [ ] Three focused core task commits with the exact IDs and own-folder paths
- [ ] Proof covers the stated failure cases, not only the happy path
- [ ] One peer review with a reason or useful question
- [ ] Shared pair or non-author witness/review slot completed
- [ ] No credentials, local database data, dependencies or generated build output committed
- [ ] I can explain one decision without copying a tutorial

**If time is short:** cut visual polish, extra examples and optional repetition first. Never silently remove the core proofs. Report the concrete blocker and continue through the same essential learning path with mentor help. Extra available time is for repetition, not a different technology track.

Next: [Week 5](week-05.md).
