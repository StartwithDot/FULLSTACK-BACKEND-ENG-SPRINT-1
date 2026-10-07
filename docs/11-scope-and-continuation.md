# Scope, pacing and continuation

## Accepted decisions

- 15 weeks, about 5 required hours weekly: 75 planned hours including setup/review/handover.
- The accepted 15-week schedule replaces the earlier shorter limit and spans roughly three and a half months.
- Ten Windows learners, including possible complete beginners.
- One shared merchant application, individual practice and rotating shared contribution.
- Five parallel skill tracks; all students follow the same 45 core tasks.
- TypeScript/JavaScript, Node/Fastify, PostgreSQL/SQL and a small practical React interface.
- Free local run path, no paid accounts, Docker/WSL/cloud requirement or external payment data.
- Actix Web remains the chosen Rust HTTP framework for the later Rust sprint, not Axum.

## Why the scope is small

75 hours is a foundation budget, not complete backend/frontend mastery or a placement guarantee. Keep supported event kinds, one currency, seeded accounts, one auth mechanism and modest list/login UI. Advanced production requirements are not hidden homework.

Beginner setup and task times can vary. The week files use planning estimates, not simulated learner measurements. Maintain the same essential path, shorten cosmetic work/extra cases and support the exact blocker rather than requiring ten hours silently. Record actual time for future pacing decisions without publishing private student reports.

## React depth

All students build typed components, props/state, controlled forms, fetch/effect cleanup, login/logout and loading/error/empty states. Basic labels/markup are included because the interface must be usable; there is no dedicated HTML/CSS design course.

No Next.js, global state library, visual design specialisation or multiple client frameworks. React is the UI; HTTP transports data between that UI and Fastify.

## Continuing the PayHook product ecosystem

| Sprint | Main learning                                                                                         | Application progression                                                                               |
| ------ | ----------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| 1      | TypeScript Web2 application foundations                                                               | MerchantDesk: local merchant event API, database and small interface                                  |
| 2      | Rust, Cargo, ownership/errors, Tokio, Actix Web and SQLx                                              | Build PayHook and connect its verified deliveries to MerchantDesk                                     |
| 3      | Production engineering, Linux, Docker, CI, failure/recovery, Redis when justified and one cloud model | Strengthen PayHook retries, history and recovery; operate both applications with a free core run path |
| 4      | Web3 fundamentals, Solana, Anchor, Rust and TS clients                                                | Extend the product through a clearly scoped sandbox chain integration                                 |
| 5      | Solidity/EVM, Foundry, contract/client integration and security exercises                             | Add a scoped EVM capability and compare assumptions with Solana                                       |

MerchantDesk is the Sprint 1 merchant application. Sprint 2 builds the separate PayHook service in Rust/Actix Web and connects it using the [handoff contract](13-payhook-handoff.md). Sprint 3 strengthens delivery reliability and operation across both applications. We reuse the product ecosystem, not rename MerchantDesk or claim its human login already authenticates PayHook.

These are program directions, not five finished syllabuses or guaranteed career outcomes. Do not add blockchain features or production deployment to Sprint 1 to imitate a future job title.

Rust has its own substantial next sprint and remains present afterward. Everyone learns the common program; no student is assigned a different optional specialisation.
