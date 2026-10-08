# Week 1: Meet the merchant and make the first change

MerchantDesk | Sprint 1 | E: Engineering and Delivery + T: TypeScript and JavaScript

## The project need

The client needs one place to inspect sandbox payment events, but the request is not yet a specification.

## Before you start

No programming experience is assumed. Follow docs/02-windows-setup.md sections 1-3; do not install PostgreSQL or study React yet.

## Outcome

A reviewed brief, a safe event summary, and one authored pull request.

## Learn and use

| Task    | Concepts and reading                                                                                                                                                                                                                                              | Minutes |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------: |
| `E01.1` | User stories, scope and a one-page context diagram. [MerchantDesk client brief](../docs/01-project-brief.md)                                                                                                                                                      |      50 |
| `T01.1` | Values, variables, objects, console output and the TS/JS relationship. [TypeScript for new programmers](https://www.typescriptlang.org/docs/handbook/typescript-from-scratch), [JavaScript guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)  |      65 |
| `E01.2` | Diffs, branches, commits and pull requests. [Git book basics](https://git-scm.com/book/en/v2/Git-Basics-Getting-a-Git-Repository), [GitHub reviews](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests) |      35 |

## Core tasks

### 1. Write the brief and context map (`E01.1`)

- [ ] Read the client story. Write the user, three useful actions, non-goals, five open questions and what a successful demo would show. Add a small Mermaid map of simulator, API, database and merchant interface. Keep implementation choices provisional.

**Primary path:** `students/<student-id>/week-01/discovery/brief.md`.

**Proof for review:** A peer can explain the same user and V1 boundary from your brief. The map labels the API as the data/security boundary.

**Known trap:** A list of technologies is not a client brief.

### 2. Run a safe event inspector (`T01.1`)

- [ ] After npm ci, use the fixture at fixtures/events.json. Begin with one object and print its event ID, kind and amount_minor. Add a function that returns that summary. Record the run command in NOTES.md next to the script. Do not print credentials or customer data.

**Primary path:** `students/<student-id>/week-01/typescript/inspector.ts`.

**Proof for review:** npm.cmd run practice -- students/BE01/week-01/typescript/inspector.ts runs after replacing BE01. Explain that tsx runs the code without typechecking; npm.cmd run typecheck is the separate compiler check.

**Known trap:** You do not need arrays, async, React or a database to finish this first program.

### 3. Complete the Git and review loop (`E01.2`)

- [ ] Use a task branch, inspect git diff, make focused task-ID commits and open one weekly PR. Review an assigned peer's change and record its link. Record real commit and PR links.

**Primary path:** `students/<student-id>/week-01/review.md`.

**Proof for review:** Your author identity is correct, changed files stay in your folder, and the review explains one choice.

**Known trap:** Run Git commands from the repository root, not your home directory.

## Shared contribution

Assigned task owners contribute reviewed work to `shared/delivery/brief.md and shared/delivery/context.md`. Record the non-author review or witness in the [Week 1 contribution log](../shared/delivery/rotations/week-01.md).

## Milestone: Agreed client brief

Record this shared milestone as complete only after a non-author reproduces the outcome and records commands and results in the contribution log.

## Completion checklist

- [ ] Three focused task-ID commits with the required proof
- [ ] Peer review and assigned shared task or witness work completed
- [ ] One implementation decision and failure case explained

Next: [Week 2](week-02.md).
