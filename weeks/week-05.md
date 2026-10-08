# Week 5: Receive one event end to end

MerchantDesk | Sprint 1 | B: Backend Development + C: Client Integration + E: Engineering and Delivery

## The project need

The merchant must accept a useful event and reject malformed input consistently.

## Before you start

Bring the app factory and field contract. Use Fastify's built-in JSON Schema; do not introduce a second validation framework.

## Keep the application connected

Continue the Week 4 app. Register week-05/api/events.ts in its factory and remove the demonstration GET before installing the replacement; do not start a second server.

See the [application wiring guide](../docs/12-application-wiring.md) for commands and module connections.

## Outcome

A simulator request reaches the API and is visible through a list endpoint.

## Learn and use

| Task    | Concepts and reading                                                                                                                                                                                                                  | Minutes |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------: |
| `B02.1` | JSON Schema, request limits, safe errors and in-memory persistence. [Fastify validation](https://fastify.dev/docs/v5.7.x/Reference/Validation-and-Serialization/), [Fastify testing](https://fastify.dev/docs/v5.7.x/Guides/Testing/) |      65 |
| `C01.1` | Node fetch, request bodies, HTTP errors and client/server separation. [Using Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)                                                                           |      45 |
| `E05.1` | Reproduction, diagrams and restart limitations. [Assessment and review](../docs/10-assessment.md)                                                                                                                                     |      40 |

## Core tasks

### 1. Add the validated event route (`B02.1`)

- [ ] Add POST /api/events and GET /api/events to your lab. Validate the full body shape and enforce the agreed amount bounds and event kinds. Configure coercion/removal deliberately so bad types and unexpected owner fields are rejected rather than silently rewritten. Add good and bad injection tests. Export registerEventRoutes and register it in week-04/api/app.ts, replacing the earlier demonstration GET. Later repositories are injected into this same route module.

**Primary path:** `students/<student-id>/week-05/api/events.ts`.

**Proof for review:** A valid event gets 201 and can be listed; invalid type, missing ID and oversized body get deliberate failures. Database persistence and auth are still later tasks.

**Known trap:** Keep the lab loopback-only. A typed request body alone is not runtime validation.

### 2. Write the first API consumer (`C01.1`)

- [ ] Send one fixture event to the local API with Node fetch, inspect response.ok and parse the response safely. Try one malformed request. This is an API consumer script, not React yet.

**Primary path:** `students/<student-id>/week-05/client/send-event.ts`.

**Proof for review:** The script records the accepted ID and reports a non-2xx as a failure instead of claiming success.

**Known trap:** Fetch can resolve successfully when HTTP returns 400; a network rejection is a different failure.

### 3. Witness the flow and update the diagram (`E05.1`)

- [ ] Have a peer run the simulator -> API -> list flow. Record actual commands, one invalid request and what disappears after restart. Update the architecture with actual local ports.

**Primary path:** `students/<student-id>/week-05/delivery/first-flow.md`.

**Proof for review:** A non-author reproduces the flow and can explain the persistence gap.

**Known trap:** Do not claim durable acceptance or a production webhook service from this demonstration.

## Shared contribution

Assigned task owners contribute reviewed work to `shared/api/src/routes/events.ts, shared/simulator/send-event.ts and shared/delivery/first-flow.md`. Record the non-author review or witness in the [Week 5 contribution log](../shared/delivery/rotations/week-05.md).

## Milestone: First local event flow

Record this shared milestone as complete only after a non-author reproduces the outcome and records commands and results in the contribution log.

## Completion checklist

- [ ] Three focused task-ID commits with the required proof
- [ ] Peer review and assigned shared task or witness work completed
- [ ] One implementation decision and failure case explained

Next: [Week 6](week-06.md).
