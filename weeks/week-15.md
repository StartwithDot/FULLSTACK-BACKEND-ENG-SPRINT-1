# Week 15: Demonstrate and hand over the merchant application

MerchantDesk | Sprint 1 | E: Engineering and Delivery + C: Client Integration

Read this file completely, then work through its three core tasks. Everyone follows the same tasks. Track letters describe skills, not student specialisations.

## The project need

The product and learning evidence must survive the original builders and continue into Sprint 2.

## Before you start

Do not add new features this week. Bring the clean-start corrections, test matrix, approved contracts and authored contribution links.

Use the [student guide](../docs/03-student-guide.md) for commands, [resource map](../docs/07-resources.md) for bounded reading and [troubleshooting](../docs/09-troubleshooting.md) when a tool fails. Replace `<student-id>` with your assigned BE number.

## By the end you can

- Finish the runbook and architecture, and explain the result using the proof below.
- Demonstrate the merchant's real actions, and explain the result using the proof below.
- Complete the independent start and contribution record, and explain the result using the proof below.

The shared outcome is: A reproducible local product, an honest demo and attributable contribution evidence.

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

| Task       | Learn only what this task needs                                                                                                                                                                                                                                                | Use immediately                                        | Minutes |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------ | ------: |
| 1: `E12.1` | Actual architecture, migrations, seed accounts, tests and limitations. [GitHub reviews](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests)                                                                          | Finish the runbook and architecture                    |      60 |
| 2: `C06.1` | User-focused demo and browser/API evidence. [HTTP overview](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview)                                                                                                                                                        | Demonstrate the merchant's real actions                |      35 |
| 3: `E12.2` | Clean-start proof, authorship and technical explanation. [Git book basics](https://git-scm.com/book/en/v2/Git-Basics-Getting-a-Git-Repository), [GitHub reviews](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests) | Complete the independent start and contribution record |      55 |

## Core tasks

### 1. Finish the runbook and architecture (`E12.1`)

- [ ] Write the final native-Windows runbook with clone/install, local configuration, database creation, migration/seed, API/UI start, tests, common failures and shutdown. Include a diagram matching actual code and a short next-sprint boundary. Propose the shared root README update in the rotation PR.

**Primary commit path:** `students/<student-id>/week-15/delivery/runbook.md`. Small companion source/tests/notes needed by this same task may be committed with it. If the path names an earlier week, continue that existing lab; do not restart it.

**Proof for review:** A stranger can find every command, secret variable and dependency; unfinished product work is named, not hidden.

**Known trap:** Do not describe Docker, queues, Rust, deployment or real payments as implemented in Sprint 1.

### 2. Demonstrate the merchant's real actions (`C06.1`)

- [ ] Demonstrate login, one accepted fixture, invalid input, duplicate/conflicting ID, filtered/paged viewing, another merchant's rejection and logout. Explain one UI/API/DB request path and state the local-only and session-revocation limits.

**Primary commit path:** `students/<student-id>/week-15/delivery/demo.md`. Small companion source/tests/notes needed by this same task may be committed with it. If the path names an earlier week, continue that existing lab; do not restart it.

**Proof for review:** The demo shows negative cases as well as success, with no real money, credentials or customer data.

**Known trap:** A polished screen does not replace backend evidence.

### 3. Complete the independent start and contribution record (`E12.2`)

- [ ] Have a non-author follow the final runbook and record commands/outcomes. Link your own core task commits/PRs and shared rotation contributions. Write two defensible resume statements about work you actually did and one limitation you can explain. Keep private grading outside this public repository.

**Primary commit path:** `students/<student-id>/week-15/delivery/handover.md`. Small companion source/tests/notes needed by this same task may be committed with it. If the path names an earlier week, continue that existing lab; do not restart it.

**Proof for review:** The final witness succeeds using the runbook, core tests pass, and individual contributions are attributable.

**Known trap:** Do not claim production ownership, Rust expertise or smart-contract work from this sprint.

## Shared contribution

Only this week's build pair promotes the reviewed work into `shared/delivery/runbook.md, shared/delivery/final-architecture.md, shared/delivery/demo.md and README.md`. This is a product contribution, not a permission to copy someone else's answer. Each contributor commits their own change with task IDs and a shared suffix. A non-author checks the result. Use the [rotation plan](../docs/06-team-roles.md).

## Milestone: Independent handover

The group agrees the requirement and reproduces the scenario before depending on it. Record the witness and outcome in the weekly rotation log. A calendar date or a green starter test is not milestone evidence.

## End-of-week checklist

- [ ] Three focused core task commits with the exact IDs and own-folder paths
- [ ] Proof covers the stated failure cases, not only the happy path
- [ ] One peer review with a reason or useful question
- [ ] Shared pair or non-author witness/review slot completed
- [ ] No credentials, local database data, dependencies or generated build output committed
- [ ] I can explain one decision without copying a tutorial

**If time is short:** cut visual polish, extra examples and optional repetition first. Never silently remove the core proofs or this milestone. Report the concrete blocker and continue through the same essential learning path with mentor help. Extra available time is for repetition, not a different technology track.

Next: carry the reviewed API, schema, interface and limitations into the Rust-focused Sprint 2.
