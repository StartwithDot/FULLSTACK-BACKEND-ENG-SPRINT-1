# Week 15: Demonstrate and hand over the merchant application

MerchantDesk | Sprint 1 | E: Engineering and Delivery + C: Client Integration

## The project need

The product and learning evidence must survive the original builders and continue into Sprint 2.

## Before you start

Do not add new features this week. Bring the clean-start corrections, test matrix, approved contracts and authored contribution links.

## Keep the application connected

Hand over the assembled MerchantDesk application, including its actual startup commands, migrations and tests.

See the [application wiring guide](../docs/12-application-wiring.md) for commands and module connections.

## Outcome

A reproducible local product, an honest demo and attributable contribution evidence.

## Learn and use

| Task    | Concepts and reading                                                                                                                                                                              | Minutes |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------: |
| `E12.1` | Actual architecture, migrations, seed accounts, tests and limitations. [Delivery documentation](../shared/delivery/README.md)                                                                     |      60 |
| `C06.1` | User-focused demo and browser/API evidence. [MerchantDesk API contract](../docs/04-api-and-security-contract.md)                                                                                  |      35 |
| `E12.2` | Clean-start proof, authorship and technical explanation. [Assessment and review](../docs/10-assessment.md), [Git book basics](https://git-scm.com/book/en/v2/Git-Basics-Getting-a-Git-Repository) |      55 |

## Core tasks

### 1. Finish the runbook and architecture (`E12.1`)

- [ ] Write the final native-Windows runbook with clone/install, local configuration, database creation, migration/seed, API/UI start, tests, common failures and shutdown. Include a diagram matching actual code and a short next-sprint boundary. Propose the shared root README update in the rotation PR.

**Primary path:** `students/<student-id>/week-15/delivery/runbook.md`.

**Proof for review:** A stranger can find every command, secret variable and dependency; unfinished product work is named, not hidden.

**Known trap:** Do not describe Docker, queues, Rust, deployment or real payments as implemented in Sprint 1.

### 2. Demonstrate the merchant's real actions (`C06.1`)

- [ ] Demonstrate login, one accepted fixture, invalid input, duplicate/conflicting ID, filtered/paged viewing, another merchant's rejection and logout. Explain one UI/API/DB request path and state the local-only and session-revocation limits.

**Primary path:** `students/<student-id>/week-15/delivery/demo.md`.

**Proof for review:** The demo shows negative cases as well as success, with no real money, credentials or customer data.

**Known trap:** A polished screen does not replace backend evidence.

### 3. Complete the independent start and contribution record (`E12.2`)

- [ ] Have a non-author follow the final runbook and record commands/outcomes. Link your own core task commits/PRs and shared rotation contributions. Write two defensible resume statements about work you actually did and one limitation you can explain. Keep private grading outside this public repository.

**Primary path:** `students/<student-id>/week-15/delivery/handover.md`.

**Proof for review:** The final witness succeeds using the runbook, core tests pass, and individual contributions are attributable.

**Known trap:** Do not claim production ownership, Rust expertise or smart-contract work from this sprint.

## Shared contribution

The build pair promotes reviewed work into `shared/delivery/runbook.md, shared/delivery/final-architecture.md, shared/delivery/demo.md and README.md`. Record the non-author review or witness in the [Week 15 rotation log](../shared/delivery/rotations/week-15.md).

## Milestone: Independent handover

A non-author reproduces this outcome and records the commands and results in the rotation log before the group advances.

## Completion checklist

- [ ] Three focused task-ID commits with the required proof
- [ ] Peer review and assigned shared-build or witness work completed
- [ ] One implementation decision and failure case explained

Next: carry the reviewed API, schema, interface and limitations into the Rust-focused Sprint 2.
