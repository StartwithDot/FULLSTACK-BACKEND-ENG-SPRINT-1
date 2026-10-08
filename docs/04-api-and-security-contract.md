# API and security contract

This is the bounded Sprint 1 target. Students implement it at the relevant week; it is not a claim that the supplied shells already implement these routes.

## Event body

| Field             | Rule                                                      |
| ----------------- | --------------------------------------------------------- |
| provider_event_id | 1-64 ASCII letters, digits, underscore or hyphen          |
| event_type        | payment.captured, payment.failed or refund.processed      |
| amount_minor      | JSON integer, 1 through 100000000; integer paise          |
| currency          | INR only in this first sprint                             |
| occurred_at       | Real UTC timestamp in exact YYYY-MM-DDTHH:mm:ss.sssZ form |

All fields are required; unknown fields are rejected. Reject numeric strings, fractional amounts, null and impossible dates. Timestamp years are 0001-9999; reject year 0000 before database access even though JavaScript can round-trip it. Body cap: 16 KiB. Ensure runtime schema settings do not strip extra properties or coerce bad types silently. Match date parsing against a round-trip normalized value so February 31 does not become March 3.

The server adds immutable ID, verified merchant_id and received_at. Never accept merchant_id from a submitted body. An event's source timestamp does not override received_at ordering.

## Shared wire format

Use these shapes when implementing the routes, simulator and UI, including before Week 10's response-schema tests. Internal database types may differ; map them explicitly at the HTTP boundary.

- **Public event:** exactly the five input fields plus `id`, `merchant_id` and `received_at`. IDs are nonempty opaque JSON strings, not numbers; clients must not parse meaning from them. Both timestamps use the exact UTC format above. `amount_minor` remains a JSON number.
- **Login body:** exactly `{ "email": "one@example.test", "password": "local value" }`. Normalize the email by trimming and lowercasing, then require a nonempty string of at most 254 characters; seed email addresses in that same form. Passwords are strings of 1-256 UTF-8 bytes; never trim or normalize them. Reject extra fields and invalid types with 400. Validly shaped but incorrect credentials get the same generic 401.
- **Login success and GET /api/me:** status 200 with `{ "operator": { "id": "opaque-id", "email": "one@example.test", "merchant_id": "opaque-merchant-id" } }`. These are the only public operator fields. Both IDs are strings.
- **Event POST success and event detail:** return the public event object directly, not `{ event: ... }`. A repeat returns the original stored object, including its receipt timestamp.
- **Event list:** `{ "items": [], "limit": 20, "offset": 0 }`, with public events in items and numeric limit/offset.
- **Application error:** `{ "error": { "code": "VALIDATION_ERROR", "message": "Invalid request." } }`. Use stable codes for validation, unauthenticated, forbidden origin, not found, conflict, oversized body and internal/unavailable failures. Clients use the HTTP status and code, not message text. Do not include SQL, stack traces, submitted passwords or database URLs.
- **Logout:** 204 with no response body. Send the JSON request body `{}` and Content-Type application/json so the browser-write rule applies consistently. Do not call response.json() on a 204.

These are synthetic shape examples, not credentials to seed or implementation answers. The student defines the internal types, mapping, queries and tests.

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

List queries accept only optional `kind`, `limit` and `offset`, each once. Omitted kind means all three supported event kinds; a supplied kind must equal an allowed event_type. Defaults are limit 20 and offset 0. Supplied limit/offset must be unsigned decimal digit strings that parse to safe integers, with limit 1-50 and offset >=0. Reject unknown/repeated keys, empty values, fractions, signs and invalid bounds with 400.

URL query values arrive as strings. Validate and parse them deliberately at that boundary; do not enable coercion for event or login JSON bodies just to accept `?limit=20`. Return numeric limit/offset in the list envelope. Order by received_at DESC then ID DESC. OFFSET is adequate here, but new writes can shift pages. Do not claim snapshot-consistent pagination.

## Identity and duplicate behavior

PostgreSQL uniquely enforces (merchant_id, provider_event_id). Use atomic insert/conflict handling. Compare the agreed content fields for repeated identity. Identical content returns the original ID; changed content is a conflict and never overwrites the original. A different merchant may use the same provider ID.

These are ingestion guarantees, not exactly-once delivery or a financial accounting model.

## Chosen authentication mechanism

Use seeded synthetic local operators, the supplied async scrypt password helper and [@fastify/secure-session](https://github.com/fastify/fastify-secure-session). Do not implement encryption, password-reset flows or an additional JWT scheme.

Keep a random 32-byte session key in ignored configuration. Set explicit one-hour plugin expiry AND cookie lifetime, HttpOnly and SameSite=Lax. Secure is false only for local loopback HTTP; any later HTTPS deployment needs Secure. Do not store the cookie in localStorage. Resolve the operator/merchant from current server data, not an unsigned client claim.

Regenerate at login and delete at logout. Stateless cookies have a limitation: a stolen copy can remain valid until expiry unless an additional revocation mechanism is built. That mechanism belongs to a later production requirement; describe the limitation honestly.

Prove server-side expiry using a controlled test clock beyond one hour, restoring it after the test. Do not wait an hour or shorten the real application's expiry just to obtain a passing proof. Keep clock-changing tests isolated from parallel work.

## Browser writes and local environment

For login, logout and event POSTs, require application/json and an exact configured Origin. Reject missing or other origins. This narrows the local browser threat model and prevents the course from treating SameSite as the only CSRF defense. API scripts/injection tests deliberately send the allowed Origin. The header is not proof of identity for arbitrary clients.

Development browser origin is http://localhost:5173. Vite proxies relative /api calls to http://127.0.0.1:3000. No wildcard credentialed CORS. The development proxy is not production deployment.

Bind the API to loopback for this sprint. No public tunneling or port forwarding. Secrets/passwords/cookies/auth headers never appear in logs, client responses or public evidence.

The references are [OWASP CSRF guidance](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html) and [session guidance](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html). This is application-security foundations, not professional auditing certification.

## Following-sprint integration

PayHook will use a separate receiver endpoint and service credential, not operator cookies or Origin headers as authentication. The [program handoff](../admin/payhook-handoff.md) defines that future contract. It adds no Sprint 1 endpoints or tasks.
