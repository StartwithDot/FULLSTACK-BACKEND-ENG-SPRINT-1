# Week 5: Receive one event end to end

MerchantDesk | Sprint 1 | B: Backend Development + C: Client Integration + E: Engineering and Delivery

Read this file completely, then work through its three core tasks. Everyone follows the same tasks. Track letters describe skills, not student specialisations.

## The project need

The merchant must accept a useful event and reject malformed input consistently.

## Before you start

Bring the app factory and field contract. Use Fastify's built-in JSON Schema; do not introduce a second validation framework.

Use the [student guide](../docs/03-student-guide.md) for commands, [resource map](../docs/07-resources.md) for bounded reading and [troubleshooting](../docs/09-troubleshooting.md) when a tool fails. Replace `<student-id>` with your assigned BE number.

## By the end you can

- Add the validated event route, and explain the result using the proof below.
- Write the first API consumer, and explain the result using the proof below.
- Witness the flow and update the diagram, and explain the result using the proof below.

The shared outcome is: A simulator request reaches the API and is visible through a list endpoint.

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

| Task       | Learn only what this task needs                                                                                                                                                                                                       | Use immediately                         | Minutes |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- | ------: |
| 1: `B02.1` | JSON Schema, request limits, safe errors and in-memory persistence. [Fastify validation](https://fastify.dev/docs/v5.7.x/Reference/Validation-and-Serialization/), [Fastify testing](https://fastify.dev/docs/v5.7.x/Guides/Testing/) | Add the validated event route           |      65 |
| 2: `C01.1` | Node fetch, request bodies, HTTP errors and client/server separation. [Using Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)                                                                           | Write the first API consumer            |      45 |
| 3: `E05.1` | Reproduction, diagrams and restart limitations. [GitHub reviews](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests)                                                        | Witness the flow and update the diagram |      40 |

## Core tasks

### 1. Add the validated event route (`B02.1`)

- [ ] Add POST /api/events and GET /api/events to your lab. Validate the full body shape and enforce the agreed amount bounds and event kinds. Configure coercion/removal deliberately so bad types and unexpected owner fields are rejected rather than silently rewritten. Add good and bad injection tests.

**Primary commit path:** `students/<student-id>/week-05/api/events.ts`. Small companion source/tests/notes needed by this same task may be committed with it. If the path names an earlier week, continue that existing lab; do not restart it.

**Proof for review:** A valid event gets 201 and can be listed; invalid type, missing ID and oversized body get deliberate failures. Database persistence and auth are still later tasks.

**Known trap:** Keep the lab loopback-only. A typed request body alone is not runtime validation.

### 2. Write the first API consumer (`C01.1`)

- [ ] Send one fixture event to the local API with Node fetch, inspect response.ok and parse the response safely. Try one malformed request. This is an API consumer script, not React yet.

**Primary commit path:** `students/<student-id>/week-05/client/send-event.ts`. Small companion source/tests/notes needed by this same task may be committed with it. If the path names an earlier week, continue that existing lab; do not restart it.

**Proof for review:** The script records the accepted ID and reports a non-2xx as a failure instead of claiming success.

**Known trap:** Fetch can resolve successfully when HTTP returns 400; a network rejection is a different failure.

### 3. Witness the flow and update the diagram (`E05.1`)

- [ ] Have a peer run the simulator -> API -> list flow. Record actual commands, one invalid request and what disappears after restart. Update the architecture with actual local ports.

**Primary commit path:** `students/<student-id>/week-05/delivery/first-flow.md`. Small companion source/tests/notes needed by this same task may be committed with it. If the path names an earlier week, continue that existing lab; do not restart it.

**Proof for review:** A person outside the build pair reproduces the flow and can explain the persistence gap.

**Known trap:** Do not claim durable acceptance or a production webhook service from this demonstration.

## Shared contribution

Only this week's build pair promotes the reviewed work into `shared/api/src/routes/events.ts, shared/simulator/send-event.ts and shared/delivery/first-flow.md`. This is a product contribution, not a permission to copy someone else's answer. Each contributor commits their own change with task IDs and a shared suffix. A non-author checks the result. Use the [rotation plan](../docs/06-team-roles.md).

## Milestone: First local event flow

The group agrees the requirement and reproduces the scenario before depending on it. Record the witness and outcome in the weekly rotation log. A calendar date or a green starter test is not milestone evidence.

## End-of-week checklist

- [ ] Three focused core task commits with the exact IDs and own-folder paths
- [ ] Proof covers the stated failure cases, not only the happy path
- [ ] One peer review with a reason or useful question
- [ ] Shared pair or non-author witness/review slot completed
- [ ] No credentials, local database data, dependencies or generated build output committed
- [ ] I can explain one decision without copying a tutorial

**If time is short:** cut visual polish, extra examples and optional repetition first. Never silently remove the core proofs or this milestone. Report the concrete blocker and continue through the same essential learning path with mentor help. Extra available time is for repetition, not a different technology track.

Next: [Week 6](week-06.md).
