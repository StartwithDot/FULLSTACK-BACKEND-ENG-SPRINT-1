# Week 10: Build a small merchant interface while tightening responses

MerchantDesk | Sprint 1 | C: Client Integration + B: Backend Development

Read this file completely, then work through its three core tasks. Everyone follows the same tasks. Track letters describe skills, not student specialisations.

## The project need

A merchant needs to inspect event data without typing curl commands; backend responses must stay safe.

## Before you start

Use fixtures/web-starter/ as the individual UI scaffold, following docs/03-student-guide.md. React tasks begin with static synthetic data, while backend response work continues.

Use the [student guide](../docs/03-student-guide.md) for commands, [resource map](../docs/07-resources.md) for bounded reading and [troubleshooting](../docs/09-troubleshooting.md) when a tool fails. Replace `<student-id>` with your assigned BE number.

## Keep the application connected

Keep using your continuing API. Copy the immutable web-starter once into week-10/client and retain that client folder through Week 13.

Read the [individual wiring guide](../docs/14-individual-app-wiring.md) for the module map and repeatable commands. This is integration guidance for the existing core tasks, not additional work.

## By the end you can

- Render a typed event list, and explain the result using the proof below.
- Add a small controlled filter, and explain the result using the proof below.
- Shape and test safe API responses, and explain the result using the proof below.

The shared outcome is: Typed UI components and bounded safe API responses.

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

| Task       | Learn only what this task needs                                                                                                                                                                                      | Use immediately                   | Minutes |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- | ------: |
| 1: `C03.1` | JSX, typed props, lists, keys and minimal semantic markup. [React quick start](https://react.dev/learn)                                                                                                              | Render a typed event list         |      50 |
| 2: `C03.2` | useState, event handlers, forms and labels. [React state](https://react.dev/learn/state-a-components-memory)                                                                                                         | Add a small controlled filter     |      45 |
| 3: `B07.1` | Response DTOs, JSON Schema and privacy boundaries. [Fastify validation](https://fastify.dev/docs/v5.7.x/Reference/Validation-and-Serialization/), [Fastify testing](https://fastify.dev/docs/v5.7.x/Guides/Testing/) | Shape and test safe API responses |      55 |

## Core tasks

### 1. Render a typed event list (`C03.1`)

- [ ] Copy the supplied web scaffold into your own week-10/client once. Add an EventList component with typed props and stable event IDs as keys. Show event kind, currency, integer-derived display amount and timestamp. Use a heading and a table or accessible list.

**Primary commit path:** `students/<student-id>/week-10/client/src/EventList.tsx`. Small companion source/tests/notes needed by this same task may be committed with it. If the path names an earlier week, continue that existing lab; do not restart it.

**Proof for review:** The local UI renders two events and a meaningful empty state; a peer can explain where props come from.

**Known trap:** React renders the interface. HTTP fetch, not React itself, transports API requests.

### 2. Add a small controlled filter (`C03.2`)

- [ ] Add a labelled kind selector and a submit/reset interaction on the static data. Keep data in the parent and explain a prop/state distinction. Use the supplied modest CSS; do not add a design system, router or global state package.

**Primary commit path:** `students/<student-id>/week-10/client/src/App.tsx`. Small companion source/tests/notes needed by this same task may be committed with it. If the path names an earlier week, continue that existing lab; do not restart it.

**Proof for review:** Filter/reset work and keyboard users can operate the control. No button uses a fake network success message.

**Known trap:** Do not turn this into a frontend styling project.

### 3. Shape and test safe API responses (`B07.1`)

- [ ] Return only public event fields and the paging envelope. Add response schemas and tests proving operator password hashes, cookie values and internal SQL errors are absent. Compare the response shape with the UI props; use an explicit mapping instead of pretending DB rows are already browser models.

**Primary commit path:** `students/<student-id>/week-10/api/response-contract.test.ts`. Small companion source/tests/notes needed by this same task may be committed with it. If the path names an earlier week, continue that existing lab; do not restart it.

**Proof for review:** The JSON shape is documented and negative tests prove private fields are excluded.

**Known trap:** A response TypeScript type does not strip private properties at runtime.

## Shared contribution

Only this week's build pair promotes the reviewed work into `shared/web/src/App.tsx, shared/web/src/EventList.tsx and shared/api/src/routes/events.ts`. This is a product contribution, not a permission to copy someone else's answer. Each contributor commits their own change with task IDs and a shared suffix. A non-author checks the result. Use the [rotation plan](../docs/06-team-roles.md).

## End-of-week checklist

- [ ] Three focused core task commits with the exact IDs and own-folder paths
- [ ] Proof covers the stated failure cases, not only the happy path
- [ ] One peer review with a reason or useful question
- [ ] Shared pair or non-author witness/review slot completed
- [ ] No credentials, local database data, dependencies or generated build output committed
- [ ] I can explain one decision without copying a tutorial

**If time is short:** cut visual polish, extra examples and optional repetition first. Never silently remove the core proofs. Report the concrete blocker and continue through the same essential learning path with mentor help. Extra available time is for repetition, not a different technology track.

Next: [Week 11](week-11.md).
