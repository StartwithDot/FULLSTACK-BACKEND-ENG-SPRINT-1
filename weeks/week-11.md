# Week 11: Connect the interface to the protected backend

MerchantDesk | Sprint 1 | C: Client Integration + E: Engineering and Delivery

Read this file completely, then work through its three core tasks. Everyone follows the same tasks. Track letters describe skills, not student specialisations.

## The project need

The interface currently shows static data and needs real authenticated event queries.

## Before you start

Keep editing your week-10/client scaffold. Start only one UI on port 5173 and the API on 3000; Vite proxies /api to the API. The browser uses relative /api URLs.

Use the [student guide](../docs/03-student-guide.md) for commands, [resource map](../docs/07-resources.md) for bounded reading and [troubleshooting](../docs/09-troubleshooting.md) when a tool fails. Replace `<student-id>` with your assigned BE number.

## Keep the application connected

Run dev:student alongside your existing week-10 client. Relative /api calls reach that continuing app; do not point the browser at an unrelated weekly demonstration.

Read the [individual wiring guide](../docs/14-individual-app-wiring.md) for the module map and repeatable commands. This is integration guidance for the existing core tasks, not additional work.

## By the end you can

- Fetch and render real events, and explain the result using the proof below.
- Connect login and logout, and explain the result using the proof below.
- Witness the browser-to-database path, and explain the result using the proof below.

The shared outcome is: A signed-in merchant can inspect its own persisted events through React.

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

| Task       | Learn only what this task needs                                                                                                                                                                                         | Use immediately                      | Minutes |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ | ------: |
| 1: `C04.1` | Fetch, effects, loading/error/empty states and cancellation. [Using Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch), [React effects](https://react.dev/learn/synchronizing-with-effects) | Fetch and render real events         |      60 |
| 2: `C04.2` | Controlled credentials, cookie sessions and authentication UX. [React state](https://react.dev/learn/state-a-components-memory), [Using Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)  | Connect login and logout             |      55 |
| 3: `E08.1` | Browser network tools and end-to-end evidence. [HTTP overview](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview)                                                                                              | Witness the browser-to-database path |      35 |

## Core tasks

### 1. Fetch and render real events (`C04.1`)

- [ ] Replace static reads with relative /api fetch calls. Check response.ok and validate the expected response shape at the client boundary. Model loading, empty, data and error states explicitly. Abort superseded requests and prevent stale results from overwriting newer filters.

**Primary commit path:** `students/<student-id>/week-10/client/src/api.ts`. Small companion source/tests/notes needed by this same task may be committed with it. If the path names an earlier week, continue that existing lab; do not restart it.

**Proof for review:** The UI displays database records, reports an HTTP failure and keeps the newest filter result under a deliberate delayed response.

**Known trap:** An effect is not a place to start unlimited requests or ignore cleanup.

### 2. Connect login and logout (`C04.2`)

- [ ] Add a small login form and logout action using the protected API. Rely on the HttpOnly cookie; do not copy tokens into localStorage. Refresh /api/me on startup, return to login on 401, and use only relative /api paths through the proxy.

**Primary commit path:** `students/<student-id>/week-10/client/src/App.tsx`. Small companion source/tests/notes needed by this same task may be committed with it. If the path names an earlier week, continue that existing lab; do not restart it.

**Proof for review:** Login, page refresh, expired session and logout have deliberate UI states. Another merchant never appears in the list.

**Known trap:** A successful login response does not replace server-side authorization on later calls.

### 3. Witness the browser-to-database path (`E08.1`)

- [ ] Have a peer trace the browser request, Vite development proxy, Fastify route and PostgreSQL query. Record login, filtering, empty data and unauthorized behavior without screenshots containing credentials. Include a small sequence diagram.

**Primary commit path:** `students/<student-id>/week-11/delivery/browser-flow.md`. Small companion source/tests/notes needed by this same task may be committed with it. If the path names an earlier week, continue that existing lab; do not restart it.

**Proof for review:** A peer reproduces the flow and distinguishes UI, transport and backend authorization.

**Known trap:** The Vite proxy is development plumbing, not production hosting.

## Shared contribution

Only this week's build pair promotes the reviewed work into `shared/web/src/api.ts, shared/web/src/App.tsx and shared/delivery/browser-flow.md`. This is a product contribution, not a permission to copy someone else's answer. Each contributor commits their own change with task IDs and a shared suffix. A non-author checks the result. Use the [rotation plan](../docs/06-team-roles.md).

## End-of-week checklist

- [ ] Three focused core task commits with the exact IDs and own-folder paths
- [ ] Proof covers the stated failure cases, not only the happy path
- [ ] One peer review with a reason or useful question
- [ ] Shared pair or non-author witness/review slot completed
- [ ] No credentials, local database data, dependencies or generated build output committed
- [ ] I can explain one decision without copying a tutorial

**If time is short:** cut visual polish, extra examples and optional repetition first. Never silently remove the core proofs. Report the concrete blocker and continue through the same essential learning path with mentor help. Extra available time is for repetition, not a different technology track.

Next: [Week 12](week-12.md).
