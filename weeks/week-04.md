# Week 4: Cross the HTTP boundary without losing the model

MerchantDesk | Sprint 1 | B: Backend Development + T: TypeScript and JavaScript + E: Engineering and Delivery

## The project need

Another program must send or request events without sharing the API's memory.

## Before you start

Read the HTTP contract in docs/04-api-and-security-contract.md. PostgreSQL practice and TypeScript exercises continue; do not replace them with a standalone framework course.

## Keep the application connected

Copy the immutable API starter once. Keep week-04/api/app.ts and server.ts as the factory/listener through later weeks.

See the [application wiring guide](../docs/12-application-wiring.md) for commands and module connections.

## Outcome

A tiny HTTP application, observable async behavior and an API plan.

## Learn and use

| Task    | Concepts and reading                                                                                                                                                                                                                                                                              | Minutes |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------: |
| `B01.1` | HTTP methods, paths, headers, status, JSON and app factories. [HTTP overview](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview), [Fastify getting started](https://fastify.dev/docs/v5.7.x/Guides/Getting-Started/), [Fastify testing](https://fastify.dev/docs/v5.7.x/Guides/Testing/) |      60 |
| `T04.1` | Promises, await, try/catch, JSON parsing and cleanup. [Using promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)                                                                                                                                              |      50 |
| `E04.1` | Request/response contracts and design trade-offs. [MerchantDesk API contract](../docs/04-api-and-security-contract.md), [HTTP overview](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview)                                                                                               |      40 |

## Core tasks

### 1. Build and inspect a tiny Fastify API (`B01.1`)

- [ ] Copy the immutable fixtures/api-starter once into your week-04/api folder as described in docs/12-application-wiring.md. Continue its exported createApp factory and separate server.ts listener. Add an in-memory GET /api/events returning a few synthetic records, send a request with curl.exe and add an app.inject test in app.test.ts. Run the app with npm.cmd run dev:student -- BE01, replacing BE01. Bind to loopback and retain this entry point in later weeks.

**Primary path:** `students/<student-id>/week-04/api/app.ts`.

**Proof for review:** An annotated exchange names method, URL, response status and JSON. The test runs without opening a network port.

**Known trap:** The in-memory lab is local and temporary. It has no authentication yet and must not be publicly exposed.

### 2. Observe async work and failure (`T04.1`)

- [ ] Read the supplied fixture with node:fs/promises. Compare an awaited result with the Promise itself. Handle a missing file and malformed JSON deliberately; pass parsed data through the earlier checks. Explain why async is not a new thread for each request.

**Primary path:** `students/<student-id>/week-04/typescript/async-reader.ts`.

**Proof for review:** Successful and failing runs terminate with useful, safe messages. A parsing failure is not mistaken for an empty event list.

**Known trap:** Catch only what you can explain; do not catch every error and return success.

### 3. Review the API and schema together (`E04.1`)

- [ ] Specify the initial POST/list/detail routes, field rules, error shape and the future owner filter. Draw the request path and name the limits of the in-memory version. Compare the plan with Week 3's relational model.

**Primary path:** `students/<student-id>/week-04/design/api-contract.md`.

**Proof for review:** A peer can name what belongs in HTTP, validation and persistence, and what is missing before public deployment.

**Known trap:** Do not invent queue, Rust service or microservice boundaries in Sprint 1.

## Shared contribution

The build pair promotes reviewed work into `shared/api/src/app.ts and shared/delivery/api-contract.md`. Record the non-author review or witness in the [Week 4 rotation log](../shared/delivery/rotations/week-04.md).

## Completion checklist

- [ ] Three focused task-ID commits with the required proof
- [ ] Peer review and assigned shared-build or witness work completed
- [ ] One implementation decision and failure case explained

Next: [Week 5](week-05.md).
