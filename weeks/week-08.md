# Week 8: Authenticate a merchant operator

MerchantDesk | Sprint 1 | B: Backend Development + E: Engineering and Delivery

Read this file completely, then work through its three core tasks. Everyone follows the same tasks. Track letters describe skills, not student specialisations.

## The project need

The API must distinguish a signed-in operator from an anonymous request before exposing merchant data.

## Before you start

Use the supplied password helper in fixtures/passwords.ts and @fastify/secure-session. Read the exact session settings in docs/04-api-and-security-contract.md. Do not design custom encryption or teach JWT and sessions together.

Use the [student guide](../docs/03-student-guide.md) for commands, [resource map](../docs/07-resources.md) for bounded reading and [troubleshooting](../docs/09-troubleshooting.md) when a tool fails. Replace `<student-id>` with your assigned BE number.

## By the end you can

- Add seeded operator login, and explain the result using the proof below.
- Use an expiring cookie session, and explain the result using the proof below.
- Review the auth and browser boundary, and explain the result using the proof below.

The shared outcome is: Login, expiry and logout with protected API access.

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

| Task       | Learn only what this task needs                                                                                                                                                                                             | Use immediately                      | Minutes |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ | ------: |
| 1: `B05.1` | Authentication, password hashing, seeded accounts and generic failures. [Node 22 crypto](https://nodejs.org/docs/latest-v22.x/api/crypto.html), [Fastify secure-session](https://github.com/fastify/fastify-secure-session) | Add seeded operator login            |      60 |
| 2: `B05.2` | HttpOnly cookies, plugin expiry, logout and server identity. [Fastify secure-session](https://github.com/fastify/fastify-secure-session)                                                                                    | Use an expiring cookie session       |      50 |
| 3: `E07.1` | Authentication versus authorization, CSRF and local-only operation. [OWASP CSRF prevention](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html)                          | Review the auth and browser boundary |      40 |

## Core tasks

### 1. Add seeded operator login (`B05.1`)

- [ ] Add operators related to merchants and a local seed script that reads demo passwords from ignored environment variables. Use the supplied async password helper rather than plaintext storage. Validate and bound login fields, query by email with parameters, and return the same failure message for absent users and wrong passwords. No signup/reset feature is required.

**Primary commit path:** `students/<student-id>/week-08/api/login.ts`. Small companion source/tests/notes needed by this same task may be committed with it. If the path names an earlier week, continue that existing lab; do not restart it.

**Proof for review:** Correct credentials succeed; wrong credentials fail; the database and responses contain no plaintext password. Test the helper with good and bad passwords.

**Known trap:** Passwords, session keys and hashes do not belong in logs or PR screenshots.

### 2. Use an expiring cookie session (`B05.2`)

- [ ] Use a generated 32-byte key from ignored configuration, explicit one-hour plugin expiry and matching cookie lifetime. Set HttpOnly and SameSite=Lax. Secure is false only for loopback HTTP development; HTTPS requires Secure. Regenerate at login, delete at logout, and protect event routes with a server-resolved operator.

**Primary commit path:** `students/<student-id>/week-08/api/session.ts`. Small companion source/tests/notes needed by this same task may be committed with it. If the path names an earlier week, continue that existing lab; do not restart it.

**Proof for review:** Missing/tampered/expired cookies fail; logout clears the browser session; a server-side check enforces expiry.

**Known trap:** Stateless logout clears this browser's cookie but does not revoke a stolen copy before expiry. Name that limitation.

### 3. Review the auth and browser boundary (`E07.1`)

- [ ] Draw where credentials, encrypted cookie and merchant ID live. For login/logout/event writes require application/json and an exact allowed Origin including scheme/host/port; test missing or foreign origins. Node simulator and injection tests must deliberately send the agreed Origin. Do not rely on SameSite alone.

**Primary commit path:** `students/<student-id>/week-08/security/auth-model.md`. Small companion source/tests/notes needed by this same task may be committed with it. If the path names an earlier week, continue that existing lab; do not restart it.

**Proof for review:** A peer checks anonymous, bad-origin and expiry cases and finds no credential exposure.

**Known trap:** An Origin check is a browser CSRF control, not authentication for arbitrary scripts. Do not enable wildcard credentialed CORS.

## Shared contribution

Only this week's build pair promotes the reviewed work into `shared/database/migrations/003-operators.sql, shared/api/src/auth.ts and shared/delivery/security-model.md`. This is a product contribution, not a permission to copy someone else's answer. Each contributor commits their own change with task IDs and a shared suffix. A non-author checks the result. Use the [rotation plan](../docs/06-team-roles.md).

## End-of-week checklist

- [ ] Three focused core task commits with the exact IDs and own-folder paths
- [ ] Proof covers the stated failure cases, not only the happy path
- [ ] One peer review with a reason or useful question
- [ ] Shared pair or non-author witness/review slot completed
- [ ] No credentials, local database data, dependencies or generated build output committed
- [ ] I can explain one decision without copying a tutorial

**If time is short:** cut visual polish, extra examples and optional repetition first. Never silently remove the core proofs. Report the concrete blocker and continue through the same essential learning path with mentor help. Extra available time is for repetition, not a different technology track.

Next: [Week 9](week-09.md).
