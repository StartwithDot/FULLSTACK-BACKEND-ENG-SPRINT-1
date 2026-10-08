# Client brief: MerchantDesk

## The client

A small merchant team receives sandbox payment-event records from different test scripts. Their support operator cannot reliably answer: which payments were captured, which failed, whether the same event was submitted twice, or which records belong to their merchant.

Their initial ask is: "Give us one place to inspect our payment events and stop duplicate records confusing support."

The cohort is the engineering team. In Week 1 each student clarifies the user, open questions and completion evidence. The shared brief can narrow details, but it cannot silently remove ownership or validation.

## Sprint 1 boundary

Build MerchantDesk: one TypeScript/Fastify API, one PostgreSQL database and one small React interface. Start as a modular application, not microservices.

## Application flow

The local simulator sends a synthetic payment notification to the MerchantDesk API. The API validates it, stores it in PostgreSQL and returns the stored record or an error. A merchant operator uses the React interface to sign in and inspect their own records.

- **Simulator:** supplies sample notifications; it does not process payments.
- **MerchantDesk API:** owns validation, authentication and merchant access.
- **PostgreSQL:** stores the accepted records and enforces relational constraints.
- **React interface:** displays the API's results to the operator.

The following Rust sprint adds PayHook as a separate delivery service. It sends verified notifications to MerchantDesk using service authentication, not the human operator's login. That integration is outside Sprint 1.

## Required behavior

Core user actions:

1. Sign in as a seeded synthetic merchant operator.
2. Submit an event through the authenticated sandbox API/simulator.
3. View, filter and paginate that merchant's events.
4. Inspect one owned event.
5. Sign out and receive a meaningful unauthorized state.

Core engineering behavior:

- Runtime input validation, amount/date bounds and safe errors.
- Durable accepted events and relational constraints.
- Merchant-scoped unique identity with defined repeat/conflict responses.
- Authentication separate from ownership checks.
- Unit/HTTP/real-database checks for the important failure cases.
- Local reproducibility, a modest interface and an honest runbook.

## What an event means

Supported fields are `provider_event_id`, `event_type`, `amount_minor`, `currency` and `occurred_at`. The exact rules and responses are in [the API/security contract](04-api-and-security-contract.md).

All data is synthetic. INR amounts are integer paise. The application records events, not balances or settled financial truth. Different merchants may use the same provider event ID.

## Staged decisions

The first local HTTP lab uses one synthetic merchant and in-memory storage. PostgreSQL arrives before authentication. These versions stay loopback-only.

Week 8 adds seeded operators and one-hour encrypted cookie sessions. Week 9 applies verified merchant ownership to every operation and proves it using two merchants. Do not publicly deploy the earlier labs.

## Non-goals

No real payment processing, card/customer data, provider credentials, publicly exposed webhook endpoint, HMAC verification, refund execution, account registration/reset, production billing, guaranteed exactly-once delivery, background retry system or polished commercial dashboard.

No mandatory Rust, Redis, Docker, AWS, queues, Terraform, blockchain, Next.js, additional Node frameworks or paid service in this first sprint. Those subjects belong to later program requirements, not hidden Sprint 1 prerequisites.

## Input material

The [fixture guide](../fixtures/README.md) describes the supplied event bodies, validation cases, practice SQL and scaffolds. No live external dataset or account is needed.

## Handover

The clean-start operator can install dependencies, create/configure a fresh named local database, run final migrations and seed tooling, start API/UI, demonstrate acceptance/rejection/duplicate/ownership cases and run tests. The architecture and command paths match real code. The final product is locally demonstrable, not a claim of production deployment.
