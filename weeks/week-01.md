# Week 1: Meet the merchant and make the first change

MerchantDesk | Sprint 1 | E: Engineering and Delivery + T: TypeScript and JavaScript

Read this file completely, then work through its three core tasks. Everyone follows the same tasks. Track letters describe skills, not student specialisations.

## The project need

The client needs one place to inspect sandbox payment events, but the request is not yet a specification.

## Before you start

No programming experience is assumed. Follow docs/02-windows-setup.md sections 1-3; do not install PostgreSQL or study React yet.

Use the [student guide](../docs/03-student-guide.md) for commands, [resource map](../docs/07-resources.md) for bounded reading and [troubleshooting](../docs/09-troubleshooting.md) when a tool fails. Replace `<student-id>` with your assigned BE number.

## By the end you can

- Write the brief and context map, and explain the result using the proof below.
- Run a safe event inspector, and explain the result using the proof below.
- Complete the Git and review loop, and explain the result using the proof below.

The shared outcome is: A reviewed brief, a safe event summary, and one authored pull request.

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

| Task       | Learn only what this task needs                                                                                                                                                                                                                                   | Use immediately                  | Minutes |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- | ------: |
| 1: `E01.1` | User stories, scope and a one-page context diagram. [HTTP overview](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview)                                                                                                                                   | Write the brief and context map  |      50 |
| 2: `T01.1` | Values, variables, objects, console output and the TS/JS relationship. [TypeScript for new programmers](https://www.typescriptlang.org/docs/handbook/typescript-from-scratch), [JavaScript guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)  | Run a safe event inspector       |      65 |
| 3: `E01.2` | Diffs, branches, commits and pull requests. [Git book basics](https://git-scm.com/book/en/v2/Git-Basics-Getting-a-Git-Repository), [GitHub reviews](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests) | Complete the Git and review loop |      35 |

## Core tasks

### 1. Write the brief and context map (`E01.1`)

- [ ] Read the client story. Write the user, three useful actions, non-goals, five open questions and what a successful demo would show. Add a small Mermaid map of simulator, API, database and merchant interface. Keep implementation choices provisional.

**Primary commit path:** `students/<student-id>/week-01/discovery/brief.md`. Small companion source/tests/notes needed by this same task may be committed with it. If the path names an earlier week, continue that existing lab; do not restart it.

**Proof for review:** A peer can explain the same user and V1 boundary from your brief. The map labels the API as the data/security boundary.

**Known trap:** A list of technologies is not a client brief.

### 2. Run a safe event inspector (`T01.1`)

- [ ] After npm ci, use the fixture at fixtures/events.json. Begin with one object and print its event ID, kind and amount_minor. Add a function that returns that summary. Record the run command in NOTES.md next to the script. Do not print credentials or customer data.

**Primary commit path:** `students/<student-id>/week-01/typescript/inspector.ts`. Small companion source/tests/notes needed by this same task may be committed with it. If the path names an earlier week, continue that existing lab; do not restart it.

**Proof for review:** npm run practice -- students/BE01/week-01/typescript/inspector.ts runs after replacing BE01. Explain that Node executes JavaScript and TypeScript checks types before execution.

**Known trap:** You do not need arrays, async, React or a database to finish this first program.

### 3. Complete the Git and review loop (`E01.2`)

- [ ] Use a task branch, inspect git diff, make focused task-ID commits and open one weekly PR. Review an assigned peer's change and record its link. Before publication, use local branches and review the diff together; record the commit instead of inventing a PR URL.

**Primary commit path:** `students/<student-id>/week-01/review.md`. Small companion source/tests/notes needed by this same task may be committed with it. If the path names an earlier week, continue that existing lab; do not restart it.

**Proof for review:** Your author identity is correct, changed files stay in your folder, and the review explains one choice.

**Known trap:** Run Git commands from the repository root, not C:\Users\josep.

## Shared contribution

Only this week's build pair promotes the reviewed work into `shared/delivery/brief.md and shared/delivery/context.md`. This is a product contribution, not a permission to copy someone else's answer. Each contributor commits their own change with task IDs and a shared suffix. A non-author checks the result. Use the [rotation plan](../docs/06-team-roles.md).

## Milestone: Agreed client brief

The group agrees the requirement and reproduces the scenario before depending on it. Record the witness and outcome in the weekly rotation log. A calendar date or a green starter test is not milestone evidence.

## End-of-week checklist

- [ ] Three focused core task commits with the exact IDs and own-folder paths
- [ ] Proof covers the stated failure cases, not only the happy path
- [ ] One peer review with a reason or useful question
- [ ] Shared pair or non-author witness/review slot completed
- [ ] No credentials, local database data, dependencies or generated build output committed
- [ ] I can explain one decision without copying a tutorial

**If time is short:** cut visual polish, extra examples and optional repetition first. Never silently remove the core proofs or this milestone. Report the concrete blocker and continue through the same essential learning path with mentor help. Extra available time is for repetition, not a different technology track.

Next: [Week 2](week-02.md).
