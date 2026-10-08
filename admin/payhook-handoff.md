# MerchantDesk and the PayHook handoff

This is a maintainer-facing program design reference. Students complete the Sprint 1 brief and API contract; no future receiver implementation is required here.

## Program progression

| Sprint | Main learning                                                                                         | Application progression                                                                               |
| ------ | ----------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| 1      | TypeScript Web2 application foundations                                                               | MerchantDesk: local merchant event API, database and small interface                                  |
| 2      | Rust, Cargo, ownership/errors, Tokio, Actix Web and SQLx                                              | Build PayHook and connect its verified deliveries to MerchantDesk                                     |
| 3      | Production engineering, Linux, Docker, CI, failure/recovery, Redis when justified and one cloud model | Strengthen PayHook retries, history and recovery; operate both applications with a free core run path |
| 4      | Web3 fundamentals, Solana, Anchor, Rust and TS clients                                                | Extend the product through a clearly scoped sandbox chain integration                                 |
| 5      | Solidity/EVM, Foundry, contract/client integration and security exercises                             | Add a scoped EVM capability and compare assumptions with Solana                                       |

These later directions need their own detailed syllabuses. MerchantDesk and PayHook remain distinct applications; no blockchain features are added to Sprint 1.

## What Sprint 1 delivers

MerchantDesk is the complete small merchant-side application for Sprint 1: an event API, PostgreSQL storage, operator login, merchant ownership, duplicate handling and a small inspection interface. The local simulator submits synthetic records directly through its operator API.

PayHook is the main webhook reliability service introduced in the Rust sprint. It verifies provider webhooks, stores them and forwards deliveries to MerchantDesk. Later production work adds bounded retries, attempt history and recovery. MerchantDesk remains the destination and inspection application; it is not renamed into PayHook.

Sprint 1 completes the [current API contract](../docs/04-api-and-security-contract.md). The future integration below is a documented handoff target, not another Sprint 1 task or an implemented starter endpoint.

## Ownership of responsibilities

| Component                    | Responsibility                                                                                   |
| ---------------------------- | ------------------------------------------------------------------------------------------------ |
| Mock provider                | Generate and sign synthetic provider events                                                      |
| PayHook                      | Verify provider input, retain the event, forward it and manage delivery attempts                 |
| MerchantDesk                 | Authenticate the delivery client, validate the forwarded event, commit it and show owned records |
| MerchantDesk React interface | Let a human operator sign in and inspect the merchant's records                                  |

A payment-provider signature is checked by PayHook. MerchantDesk separately authenticates PayHook. Neither a provider signature nor a successful delivery proves that real money moved.

## Two different authentication boundaries

The Sprint 1 /api routes use a human operator's encrypted cookie session. State-changing browser requests also require the exact configured Origin. The simulator uses that same operator flow during this sprint.

The later POST /integrations/payhook/events route uses a separate, per-merchant, random 32-byte opaque receiver credential in the Authorization: Bearer header. It is not a JWT or an operator cookie. The receiver credential grants only event delivery for one merchant, not dashboard access.

Keep credentials in ignored local configuration or protected service configuration. Never put them in URLs, browser code, event bodies, logs or demonstrations. Bind local exercises to loopback; any non-loopback deployment requires HTTPS. Reject missing/invalid/revoked receiver credentials with a generic 401. The server resolves the merchant from the verified credential, never from a submitted merchant_id.

The integration route must not inherit the browser-cookie/Origin gate. An Origin header is not service authentication. Conversely, a receiver token must not authorize the /api management routes. Provisioning and rotation are implemented when this route is introduced in the following sprint, not added to the current 45 tasks.

See [OWASP REST security](https://cheatsheetseries.owasp.org/cheatsheets/REST_Security_Cheat_Sheet.html) and the [Bearer header format](https://www.rfc-editor.org/rfc/rfc6750). This uses the header convention, not a claim that the course implements an OAuth authorization server.

## Version 1 delivery request for the following sprint

Send application/json to POST /integrations/payhook/events. Limit the complete body to 16 KiB.

```json
{
  "version": 1,
  "source_id": "d90797d0-c4c5-4ecb-b526-502cf59da631",
  "event": {
    "provider_event_id": "sandbox_1",
    "event_type": "payment.captured",
    "amount_minor": 15000,
    "currency": "INR",
    "occurred_at": "2026-01-01T10:00:00.000Z"
  }
}
```

The outer object requires exactly version, source_id and event. version is the integer 1. source_id is PayHook's stable UUID for the configured source; it must not be regenerated for each attempt. event has exactly the five fields and validation rules from the Sprint 1 contract. No merchant_id is accepted.

PayHook preserves source_id, provider_event_id and event content across retries and manual replay. Attempt IDs are diagnostic metadata, not new event identities. The receiver adds its own immutable record ID and receipt timestamp.

The existing payment-specific event shape is the first adapter, not a promise to support arbitrary providers. A new provider payload requires an explicit adapter or versioned contract, not silent field stripping.

## Identity migration before connecting PayHook

Sprint 1 remains unique on (merchant_id, provider_event_id). Its direct simulator represents one sandbox source per merchant.

Before the future receiver goes live, add a forward migration:

1. Add source_id and create one persistent legacy sandbox source per merchant.
2. Backfill existing events and make the source field required.
3. Replace the two-column uniqueness rule with (merchant_id, source_id, provider_event_id).
4. Keep /api/events input unchanged; direct operator submissions use that merchant's server-selected legacy source.
5. Add the delivery route and tests for source-scoped repeat/conflict behavior.

Do not rewrite the applied Sprint 1 migrations or require students to build this migration during Sprint 1. The additional source boundary prevents unrelated providers from colliding when they use the same event ID.

## Response and delivery semantics

The receiver commits the record before returning success. It returns the public event record using the same safe field mapping as the operator API.

| Result                                                      | Receiver status          | PayHook behavior                                                             |
| ----------------------------------------------------------- | ------------------------ | ---------------------------------------------------------------------------- |
| New valid event durably stored                              | 201                      | Record successful delivery                                                   |
| Same merchant/source/ID and identical content               | 200 with original record | Record successful delivery; do not create another row                        |
| Same identity with changed content                          | 409                      | Stop automatic retry and expose the conflict                                 |
| Invalid body, unsupported version or oversized input        | 400 or 413               | Stop automatic retry and expose the rejected contract                        |
| Missing/invalid credential or forbidden/missing destination | 401, 403 or 404          | Stop automatic retry; an operator repairs configuration                      |
| Temporary failure or throttling                             | 408, 429 or 5xx          | Retry later under the bounded policy; honor valid Retry-After where supplied |
| Network failure or ambiguous timeout                        | No reliable response     | Retry the same identity/content; an earlier attempt may have committed       |

Do not turn redirects into implicit success or follow them without the reviewed destination policy. Detailed retry scheduling belongs to PayHook, not MerchantDesk.

A 2xx acknowledges durable event acceptance in this bounded application, not a completed financial side effect. At-least-once delivery plus receiver deduplication is the goal, not exactly-once HTTP.

## What is handed over after Sprint 1

Preserve the event rules, public response mapping, applied migrations, repository boundary, owned inspection routes, fixtures, negative tests and runbook.

The later integration is proven with missing/wrong credentials, a token unable to access management routes, two merchants, two sources sharing an event ID, identical retries, changed-content conflicts and a response lost after commit. Those are following-sprint integration checks, not prefilled claims of Sprint 1 success.
