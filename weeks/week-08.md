# Week 8: Authenticate a merchant operator

MerchantDesk | Sprint 1 | B: Backend Development + E: Engineering and Delivery

## The project need

The API must distinguish a signed-in operator from an anonymous request before exposing merchant data.

## Before you start

Use the supplied password helper in fixtures/passwords.ts and @fastify/secure-session. Read the exact session settings in docs/04-api-and-security-contract.md. Do not design custom encryption or teach JWT and sessions together.

## Keep the application connected

Add login and session modules to the original app. Register session support before protected routes and remove access through earlier anonymous routes; do not create a second authentication server.

See the [application wiring guide](../docs/12-application-wiring.md) for commands and module connections.

## Outcome

Login, expiry and logout with protected API access.

## Learn and use

| Task    | Concepts and reading                                                                                                                                                                                                        | Minutes |
| ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------: |
| `B05.1` | Authentication, password hashing, seeded accounts and generic failures. [Node 22 crypto](https://nodejs.org/docs/latest-v22.x/api/crypto.html), [Fastify secure-session](https://github.com/fastify/fastify-secure-session) |      60 |
| `B05.2` | HttpOnly cookies, plugin expiry, logout and server identity. [Fastify secure-session](https://github.com/fastify/fastify-secure-session)                                                                                    |      50 |
| `E07.1` | Authentication versus authorization, CSRF and local-only operation. [OWASP CSRF prevention](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html)                          |      40 |

## Core tasks

### 1. Add seeded operator login (`B05.1`)

- [ ] Add operators related to merchants and a local seed script that reads demo passwords from ignored environment variables. Use the supplied async password helper rather than plaintext storage. Validate and bound login fields, query by email with parameters, and return the same failure message for absent users and wrong passwords. No signup/reset feature is required.

**Primary path:** `students/<student-id>/week-08/api/login.ts`.

**Proof for review:** Correct credentials succeed; wrong credentials fail; the database and responses contain no plaintext password. Test the helper with good and bad passwords.

**Known trap:** Passwords, session keys and hashes do not belong in logs or PR screenshots.

### 2. Use an expiring cookie session (`B05.2`)

- [ ] Use a generated 32-byte key from ignored configuration, explicit one-hour plugin expiry and matching cookie lifetime. Set HttpOnly and SameSite=Lax. Secure is false only for loopback HTTP development; HTTPS requires Secure. Regenerate at login, delete at logout, and protect event routes with a server-resolved operator.

**Primary path:** `students/<student-id>/week-08/api/session.ts`.

**Proof for review:** Missing/tampered/expired cookies fail; logout clears the browser session; a server-side check enforces expiry.

**Known trap:** Stateless logout clears this browser's cookie but does not revoke a stolen copy before expiry. Name that limitation.

### 3. Review the auth and browser boundary (`E07.1`)

- [ ] Draw where credentials, encrypted cookie and merchant ID live. For login/logout/event writes require application/json and an exact allowed Origin including scheme/host/port; test missing or foreign origins. Node simulator and injection tests must deliberately send the agreed Origin. Do not rely on SameSite alone.

**Primary path:** `students/<student-id>/week-08/security/auth-model.md`.

**Proof for review:** A peer checks anonymous, bad-origin and expiry cases and finds no credential exposure.

**Known trap:** An Origin check is a browser CSRF control, not authentication for arbitrary scripts. Do not enable wildcard credentialed CORS.

## Shared contribution

The build pair promotes reviewed work into `shared/database/migrations/003-operators.sql, shared/api/src/auth.ts and shared/delivery/security-model.md`. Record the non-author review or witness in the [Week 8 rotation log](../shared/delivery/rotations/week-08.md).

## Completion checklist

- [ ] Three focused task-ID commits with the required proof
- [ ] Peer review and assigned shared-build or witness work completed
- [ ] One implementation decision and failure case explained

Next: [Week 9](week-09.md).
