# Week 10: Build a small merchant interface while tightening responses

MerchantDesk | Sprint 1 | C: Client Integration + B: Backend Development

## The project need

A merchant needs to inspect event data without typing curl commands; backend responses must stay safe.

## Before you start

Use fixtures/web-starter/ as the individual UI scaffold, following docs/03-student-guide.md. React tasks begin with static synthetic data, while backend response work continues.

## Keep the application connected

Keep using your continuing API. Copy the immutable web-starter once into week-10/client and retain that client folder through Week 13.

See the [application wiring guide](../docs/12-application-wiring.md) for commands and module connections.

## Outcome

Typed UI components and bounded safe API responses.

## Learn and use

| Task    | Concepts and reading                                                                                                                                                                                                 | Minutes |
| ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------: |
| `C03.1` | JSX, typed props, lists, keys and minimal semantic markup. [React quick start](https://react.dev/learn)                                                                                                              |      50 |
| `C03.2` | useState, event handlers, forms and labels. [React state](https://react.dev/learn/state-a-components-memory)                                                                                                         |      45 |
| `B07.1` | Response DTOs, JSON Schema and privacy boundaries. [Fastify validation](https://fastify.dev/docs/v5.7.x/Reference/Validation-and-Serialization/), [Fastify testing](https://fastify.dev/docs/v5.7.x/Guides/Testing/) |      55 |

## Core tasks

### 1. Render a typed event list (`C03.1`)

- [ ] Copy the supplied web scaffold into your own week-10/client once. Add an EventList component with typed props and stable event IDs as keys. Show event kind, currency, integer-derived display amount and timestamp. Use a heading and a table or accessible list.

**Primary path:** `students/<student-id>/week-10/client/src/EventList.tsx`.

**Proof for review:** The local UI renders two events and a meaningful empty state; a peer can explain where props come from.

**Known trap:** React renders the interface. HTTP fetch, not React itself, transports API requests.

### 2. Add a small controlled filter (`C03.2`)

- [ ] Add a labelled kind selector and a submit/reset interaction on the static data. Keep data in the parent and explain a prop/state distinction. Use the supplied modest CSS; do not add a design system, router or global state package.

**Primary path:** `students/<student-id>/week-10/client/src/App.tsx`.

**Proof for review:** Filter/reset work and keyboard users can operate the control. No button uses a fake network success message.

**Known trap:** Do not turn this into a frontend styling project.

### 3. Shape and test safe API responses (`B07.1`)

- [ ] Return only public event fields and the paging envelope. Add response schemas and tests proving operator password hashes, cookie values and internal SQL errors are absent. Compare the response shape with the UI props; use an explicit mapping instead of pretending DB rows are already browser models.

**Primary path:** `students/<student-id>/week-10/api/response-contract.test.ts`.

**Proof for review:** The JSON shape is documented and negative tests prove private fields are excluded.

**Known trap:** A response TypeScript type does not strip private properties at runtime.

## Shared contribution

The build pair promotes reviewed work into `shared/web/src/App.tsx, shared/web/src/EventList.tsx and shared/api/src/routes/events.ts`. Record the non-author review or witness in the [Week 10 rotation log](../shared/delivery/rotations/week-10.md).

## Completion checklist

- [ ] Three focused task-ID commits with the required proof
- [ ] Peer review and assigned shared-build or witness work completed
- [ ] One implementation decision and failure case explained

Next: [Week 11](week-11.md).
