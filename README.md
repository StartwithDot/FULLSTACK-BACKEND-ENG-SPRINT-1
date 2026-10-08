# Backend Engineering Sprint 1

**MerchantDesk: TypeScript and Web2 Application Foundations**

15 weeks | 10 students | about 5 hours weekly | Windows | free local tooling

Build MerchantDesk, a merchant-side application for receiving and inspecting synthetic payment notifications. An operator signs in, submits sample events and views only their merchant's history. The backend validates input, persists records, handles duplicates and protects ownership. A small React interface makes the API usable.

No real payments are processed. MerchantDesk is an event-recording application, not a payment gateway or accounting system. It becomes the destination for the Rust-based PayHook delivery service in a later sprint.

## Start here

1. Read [Start Here](docs/00-START-HERE.md) and the [project brief](docs/01-project-brief.md).
2. Complete the [Windows setup](docs/02-windows-setup.md) sections for Week 1.
3. Read the [student guide](docs/03-student-guide.md) and find your folder in [students/](students/README.md).
4. Open your current week's problem statement and complete the linked tasks.

## How learning works

Every student follows the same curriculum. A project requirement introduces a concept; students practise it individually, test the result and review a peer's work. Available students take small, assigned contributions to one shared application. Implementation, test and review responsibilities rotate; there are no fixed build pairs or permanent specialists. See the [shared-project responsibilities](docs/06-team-roles.md).

| Track                        | Focus                                                        |
| ---------------------------- | ------------------------------------------------------------ |
| T: TypeScript and JavaScript | Language foundations, types, functions and async behavior    |
| B: Backend Development       | HTTP APIs, validation, authentication and safe responses     |
| D: SQL and Persistence       | Data modelling, durable storage, transactions and uniqueness |
| C: Client Integration        | API consumers and a small functional React interface         |
| E: Engineering and Delivery  | Git, review, tests, diagnosis and handover                   |

Tracks progress together as requirements arise. They are not separate courses or student specialisations. Frontend work supports the backend; there is no dedicated design course.

## Repository layout

| Folder      | Purpose                                             |
| ----------- | --------------------------------------------------- |
| `docs/`     | Project contract, setup and working guides          |
| `weeks/`    | The 15 canonical weekly task files                  |
| `students/` | Individual workspaces for BE01 through BE10         |
| `shared/`   | The reviewed API, interface, database and simulator |
| `fixtures/` | Synthetic inputs and copyable teaching scaffolds    |
| `scripts/`  | Setup, test and curriculum-check tooling            |
| `admin/`    | Mentor, maintenance and future-integration notes    |

## Milestones

| Week                   | Outcome                                     |
| ---------------------- | ------------------------------------------- |
| [1](weeks/week-01.md)  | Agreed brief and system context             |
| [5](weeks/week-05.md)  | First simulator-to-API event flow           |
| [6](weeks/week-06.md)  | Accepted events survive restart             |
| [9](weeks/week-09.md)  | Authenticated, merchant-owned event access  |
| [15](weeks/week-15.md) | Independently reproducible product handover |

The [task index](docs/05-task-index.md) lists all 45 tasks. The [shared build plan](docs/08-shared-build-plan.md) connects each week to the product.

## Run the starter

From the repository root:

```powershell
npm.cmd ci
npm.cmd run check
npm.cmd run dev:api
```

In a second terminal, run `npm.cmd run dev:web` and open http://localhost:5173. The supplied API exposes liveness only; students implement the merchant features through the weekly tasks. PostgreSQL is introduced in Week 2.

## Completion

A non-author can start from a clean checkout, migrate and seed a fresh course database, sign in, submit an event, demonstrate invalid/duplicate/conflict cases, inspect only their merchant's records and run the tests using the final runbook.
