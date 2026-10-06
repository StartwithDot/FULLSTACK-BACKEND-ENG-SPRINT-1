# Backend Engineering Sprint 1

**MerchantDesk: TypeScript and Web2 Application Foundations**

15 weeks | 10 students | about 5 required hours weekly | Windows | free local tooling

This is the cohort's learning repository. Everyone learns the same essential skills through one merchant application. TypeScript, backend development, SQL, client integration and engineering habits progress in parallel around product requirements. They are not sequential mini-courses or student-selectable specialisations.

## Start here

1. [Start Here](docs/00-START-HERE.md)
2. [Client story and product boundary](docs/01-project-brief.md)
3. [Windows setup](docs/02-windows-setup.md)
4. [Student working guide](docs/03-student-guide.md)
5. Your folder in [students/](students/README.md), then [Week 1](weeks/week-01.md)

For the owner: [publish this folder to GitHub](docs/12-publish-to-github.md).

## The product

A merchant operator signs in, submits synthetic payment events and inspects their own event history. The backend validates input, persists it in PostgreSQL, handles repeated event identity, protects merchant ownership and supports bounded filtering/paging. A small React interface makes those capabilities usable.

No payments are processed. No real provider account, card data, money or cloud subscription is required. The application continues into later sprints.

## Parallel tracks

| ID  | Track                     | Purpose                                                   |
| --- | ------------------------- | --------------------------------------------------------- |
| T   | TypeScript and JavaScript | Learn the language by handling event data.                |
| B   | Backend Development       | Build HTTP boundaries, validation and authentication.     |
| D   | SQL and Persistence       | Make data durable, relational and safe under repetition.  |
| C   | Client Integration        | Consume the API and build a small useful React interface. |
| E   | Engineering and Delivery  | Review, test, diagnose, document and hand over.           |

A week combines selected tracks. Dependencies still matter; React does not have to begin in Week 1. All core work is shared across the ten students.

## Repository zones

```text
docs/          shared reading, contracts, setup and working rules
weeks/         15 canonical weekly task files
students/      BE01 to BE10, each with 15 linked problem statements
fixtures/      small synthetic inputs and supported teaching scaffolds
shared/
  api/         the single Fastify product implementation
  web/         the small React merchant interface
  database/    student-built final migrations and seed tooling
  simulator/   student-built sandbox API consumer
  delivery/    briefs, diagrams, rotation evidence and handover
scripts/       curriculum, setup and test checks
admin/         public mentor notes only, no answer keys or private grades
```

Individual practice is not the production application. The rotating pair promotes proven learning into one shared build. Everyone serves on three build rotations and reviews/witnesses other work.

## Fifteen weeks at a glance

| Week                   | Shared requirement                                                        | Tracks  |
| ---------------------- | ------------------------------------------------------------------------- | ------- |
| [1](weeks/week-01.md)  | Meet the merchant and make the first change (Agreed client brief)         | E, T    |
| [2](weeks/week-02.md)  | Represent events and ask the first SQL questions                          | T, D, E |
| [3](weeks/week-03.md)  | Functions, relational boundaries and first tests                          | T, D, E |
| [4](weeks/week-04.md)  | Cross the HTTP boundary without losing the model                          | B, T, E |
| [5](weeks/week-05.md)  | Receive one event end to end (First local event flow)                     | B, C, E |
| [6](weeks/week-06.md)  | Make accepted events survive restart (Durable event flow)                 | D, B, E |
| [7](weeks/week-07.md)  | Handle repetition and bound the list                                      | D, T, B |
| [8](weeks/week-08.md)  | Authenticate a merchant operator                                          | B, E    |
| [9](weeks/week-09.md)  | Enforce merchant ownership across every route (Protected merchant flow)   | D, B, C |
| [10](weeks/week-10.md) | Build a small merchant interface while tightening responses               | C, B    |
| [11](weeks/week-11.md) | Connect the interface to the protected backend                            | C, E    |
| [12](weeks/week-12.md) | Consolidate correctness before adding polish                              | D, B, E |
| [13](weeks/week-13.md) | Make failures visible and requests bounded                                | B, C, E |
| [14](weeks/week-14.md) | Investigate, repair and rehearse a clean start                            | E, D    |
| [15](weeks/week-15.md) | Demonstrate and hand over the merchant application (Independent handover) | E, C    |

See the [task index](docs/05-task-index.md), [shared plan](docs/08-shared-build-plan.md), [assessment evidence](docs/10-assessment.md) and [scope/pacing decisions](docs/11-scope-and-continuation.md).

## Supplied code and student work

The starter already installs, type-checks, runs fast tests and builds the API/UI shells. The API supplies a loopback-only liveness route, not finished merchant features. The UI is a minimal starting screen. Fixtures and the password helper support learning, not a completed product to copy.

Students implement the API, final migrations, auth, ownership, simulator, interface and final runbook at the named weeks. The starter checks do not imply those milestones are complete.

```powershell
npm.cmd ci
npm.cmd run check
npm.cmd run dev:api
```

In a second terminal, from the same repository root:

```powershell
npm.cmd run dev:web
```

Open http://localhost:5173. API liveness is http://localhost:3000/health/live. PostgreSQL is not needed for these starter commands; add it in Week 2 for SQL practice.

## Completion

A non-author follows the final runbook from a clean checkout, migrates and seeds a fresh named local database, signs in, submits a fixture, observes invalid/duplicate/conflict cases, inspects only their merchant's events, logs out and runs the core tests. The handover includes honest limitations and attributable student contributions.
