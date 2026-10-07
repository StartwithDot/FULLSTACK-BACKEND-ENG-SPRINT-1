# API and security contract

This is the bounded Sprint 1 target. Students implement it at the relevant week; it is not a claim that the supplied shells already implement these routes.

## Product and future service boundary

MerchantDesk implements the operator API below during Sprint 1. PayHook is a separate reliability service built in the following Rust sprint. Its future receiver route, service credential, source-aware identity migration and acknowledgment semantics are defined in the [PayHook handoff](13-payhook-handoff.md).

Do not use operator cookies or Origin headers as PayHook service authentication. Do not add the future integration endpoint to the current task count.

## Event body

| Field             | Rule                                                      |
| ----------------- | --------------------------------------------------------- |
| provider_event_id | 1-64 ASCII letters, digits, underscore or hyphen          |
| event_type        | payment.captured, payment.failed or refund.processed      |
| amount_minor      | JSON integer, 1 through 100000000; integer paise          |
| currency          | INR only in this first sprint                             |
| occurred_at       | Real UTC timestamp in exact YYYY-MM-DDTHH:mm:ss.sssZ form |

All fields are required; unknown fields are rejected. Reject numeric strings, fractional amounts, null and impossible dates. Body cap: 16 KiB. Ensure runtime schema settings do not strip extra properties or coerce bad types silently. Match date parsing against a round-trip normalized value so February 31 does not become March 3.

The server adds immutable ID, verified merchant_id and received_at. Never accept merchant_id from a submitted body. An event's source timestamp does not override received_at ordering.

## Protected application routes by Week 9

The dependency-readiness route is added in Week 13. All other routes in the table are part of the Week 9 protected-flow target.

| Method/path         | Auth                     | Required behavior                                                          |
| ------------------- | ------------------------ | -------------------------------------------------------------------------- |
| GET /health/live    | none                     | Process liveness; do not claim DB readiness                                |
| GET /health/ready   | none                     | Dependency check, 503 when database cannot serve                           |
| POST /api/login     | bounded credential check | Generic 401 on failure; set session on success                             |
| POST /api/logout    | session                  | Delete current cookie; 204                                                 |
| GET /api/me         | session                  | Public current operator identity and merchant only                         |
| POST /api/events    | session                  | Persist owned event; 201 created, 200 identical repeat, 409 changed repeat |
| GET /api/events     | session                  | Own records, kind filter, limit 1-50, offset >=0                           |
| GET /api/events/:id | session                  | Own event, or 404 for missing/another owner's ID                           |

Return a deliberate 400 for input validation and 401 for absent/invalid authentication. Do not reveal another merchant's row existence. Use a small consistent public error envelope with code and safe message; internal failures must not expose SQL/stack traces.

List envelope: `{ items, limit, offset }`. Order by received_at DESC then ID DESC. OFFSET is adequate here, but new writes can shift pages. Do not claim snapshot-consistent pagination.

## Identity and duplicate behavior

PostgreSQL uniquely enforces (merchant_id, provider_event_id). Use atomic insert/conflict handling. Compare the agreed content fields for repeated identity. Identical content returns the original ID; changed content is a conflict and never overwrites the original. A different merchant may use the same provider ID.

These are ingestion guarantees, not exactly-once delivery or a financial accounting model.

## Chosen authentication mechanism

Use seeded synthetic local operators, the supplied async scrypt password helper and [@fastify/secure-session](https://github.com/fastify/fastify-secure-session). Do not implement encryption, password-reset flows or an additional JWT scheme.

Keep a random 32-byte session key in ignored configuration. Set explicit one-hour plugin expiry AND cookie lifetime, HttpOnly and SameSite=Lax. Secure is false only for local loopback HTTP; any later HTTPS deployment needs Secure. Do not store the cookie in localStorage. Resolve the operator/merchant from current server data, not an unsigned client claim.

Regenerate at login and delete at logout. Stateless cookies have a limitation: a stolen copy can remain valid until expiry unless an additional revocation mechanism is built. That mechanism belongs to a later production requirement; describe the limitation honestly.

## Browser writes and local environment

For login, logout and event POSTs, require application/json and an exact configured Origin. Reject missing or other origins. This narrows the local browser threat model and prevents the course from treating SameSite as the only CSRF defense. API scripts/injection tests deliberately send the allowed Origin. The header is not proof of identity for arbitrary clients.

Development browser origin is http://localhost:5173. Vite proxies relative /api calls to http://127.0.0.1:3000. No wildcard credentialed CORS. The development proxy is not production deployment.

Bind the API to loopback for this sprint. No public tunneling or port forwarding. Secrets/passwords/cookies/auth headers never appear in logs, client responses or public evidence.

The references are [OWASP CSRF guidance](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html) and [session guidance](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html). This is application-security foundations, not professional auditing certification.
