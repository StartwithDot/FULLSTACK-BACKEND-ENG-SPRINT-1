# Scope and pacing

## Course boundary

- 15 weeks, 10 Windows learners and 45 core tasks.
- About five planned hours weekly, including setup, review and shared contribution.
- One MerchantDesk application, common individual practice and flexible shared-task ownership with rotating responsibilities.
- TypeScript/JavaScript, Node/Fastify, PostgreSQL/SQL and a small React interface.
- Free local tooling; no paid account, Docker, WSL, cloud subscription or real payment data required.

This is application-development foundations. Keep the agreed event kinds, one currency, seeded accounts and one authentication mechanism. Production infrastructure and blockchain are not hidden Sprint 1 prerequisites.

## Weekly budget

| Work                                              | Minutes |
| ------------------------------------------------- | ------: |
| Guided learning, task reading and scheduled setup |      90 |
| Three individual core tasks                       |     150 |
| Shared promotion or review/witness work           |      30 |
| Weekly explanation and revision                   |      30 |
| Total                                             |     300 |

Task times are planning estimates. Shared-task owners reuse proven individual work for promotion; others contribute focused tests, integration evidence or review. Unavailable owners are reassigned rather than becoming prerequisites for everyone's practice. Report concrete blockers and seek mentor review; do not omit required proofs to fit the estimate. Reduce cosmetic polish or optional repetition before changing the essential learning path.

## Frontend depth

All students learn typed components, props/state, controlled forms, HTTP fetching, login/logout and loading/error/empty states. Basic markup, labels and supplied CSS make the interface usable. There is no dedicated HTML/CSS design course, Next.js requirement or additional frontend framework.

React renders the interface. HTTP carries requests to Fastify; the backend owns validation, authentication and merchant authorization.

## Continuation

MerchantDesk remains the merchant receiver and inspection application. The next sprint builds the separate PayHook service using Rust, Tokio, Actix Web and SQLx. Later production work strengthens delivery reliability and operation. The [program handoff](../admin/payhook-handoff.md) records that future boundary; it adds no Sprint 1 tasks.
