# Week 11: Connect the interface to the protected backend

MerchantDesk | Sprint 1 | C: Client Integration + E: Engineering and Delivery

## The project need

The interface currently shows static data and needs real authenticated event queries.

## Before you start

Keep editing your week-10/client scaffold. Start only one UI on port 5173 and the API on 3000; Vite proxies /api to the API. The browser uses relative /api URLs.

## Keep the application connected

Run dev:student alongside your existing week-10 client. Relative /api calls reach that continuing app; do not point the browser at an unrelated weekly demonstration.

See the [application wiring guide](../docs/12-application-wiring.md) for commands and module connections.

## Outcome

A signed-in merchant can inspect its own persisted events through React.

## Learn and use

| Task    | Concepts and reading                                                                                                                                                                                                    | Minutes |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------: |
| `C04.1` | Fetch, effects, loading/error/empty states and cancellation. [Using Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch), [React effects](https://react.dev/learn/synchronizing-with-effects) |      60 |
| `C04.2` | Controlled credentials, cookie sessions and authentication UX. [React state](https://react.dev/learn/state-a-components-memory), [Using Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)  |      55 |
| `E08.1` | Browser network tools and end-to-end evidence. [HTTP overview](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview)                                                                                              |      35 |

## Core tasks

### 1. Fetch and render real events (`C04.1`)

- [ ] Replace static reads with relative /api fetch calls using docs/04-api-and-security-contract.md. Add next/previous page controls using the returned limit/offset, reset offset when the filter changes, and let the operator inspect one selected event through /api/events/:id. Check response.ok and validate the expected response shape at the client boundary. Model loading, empty, data and error states explicitly. Abort superseded requests and prevent stale list/detail results from overwriting newer selections. No frontend router is needed.

**Primary path:** `students/<student-id>/week-10/client/src/api.ts`.

**Proof for review:** With more records than one page, a peer pages forward/back, filters and inspects an owned event. The UI reports an HTTP failure and keeps the newest filter/detail result under a deliberate delayed response.

**Known trap:** An effect is not a place to start unlimited requests or ignore cleanup.

### 2. Connect login and logout (`C04.2`)

- [ ] Add a small login form and logout action using the protected API. Rely on the HttpOnly cookie; do not copy tokens into localStorage. Refresh /api/me on startup, return to login on 401, and use only relative /api paths through the proxy. Clear merchant records and cancel/ignore pending list/detail results when logging out, losing authentication or switching operators.

**Primary path:** `students/<student-id>/week-10/client/src/App.tsx`.

**Proof for review:** Login, page refresh, expired session and logout have deliberate UI states. Delay a merchant A request, switch to merchant B, then release the old response: no A records or detail may reappear.

**Known trap:** A successful login response does not replace server-side authorization on later calls.

### 3. Witness the browser-to-database path (`E08.1`)

- [ ] Have a peer trace the browser request, Vite development proxy, Fastify route and PostgreSQL query. Record login, filtering, empty data and unauthorized behavior without screenshots containing credentials. Include a small sequence diagram.

**Primary path:** `students/<student-id>/week-11/delivery/browser-flow.md`.

**Proof for review:** A peer reproduces the flow and distinguishes UI, transport and backend authorization.

**Known trap:** The Vite proxy is development plumbing, not production hosting.

## Shared contribution

Assigned task owners contribute reviewed work to `shared/web/src/api.ts, shared/web/src/App.tsx and shared/delivery/browser-flow.md`. Record the non-author review or witness in the [Week 11 contribution log](../shared/delivery/rotations/week-11.md).

## Completion checklist

- [ ] Three focused task-ID commits with the required proof
- [ ] Peer review and assigned shared task or witness work completed
- [ ] One implementation decision and failure case explained

Next: [Week 12](week-12.md).
