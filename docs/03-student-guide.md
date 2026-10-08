# Student guide

All ten students complete the same curriculum. Your weekly problem statement points to the canonical instructions in `weeks/`; write answers and code in your own folder.

## Set up GitHub

Fork [StartwithDot/FULLSTACK-BACKEND-ENG-SPRINT-1](https://github.com/StartwithDot/FULLSTACK-BACKEND-ENG-SPRINT-1), then clone your fork. Replace YOUR_USERNAME:

```powershell
git clone https://github.com/YOUR_USERNAME/FULLSTACK-BACKEND-ENG-SPRINT-1.git
Set-Location -LiteralPath "FULLSTACK-BACKEND-ENG-SPRINT-1"
git remote add upstream https://github.com/StartwithDot/FULLSTACK-BACKEND-ENG-SPRINT-1.git
git config user.name "Your Name"
git config user.email "YOUR_VERIFIED_OR_GITHUB_NOREPLY_EMAIL"
npm.cmd ci
```

Students push to their fork (`origin`) and open PRs to the official cohort (`upstream`). Write collaborators may clone the official repository directly and use `origin` instead of `upstream` when updating main.

## Weekly workflow

Start with a clean main branch. Replace the student ID and week below with your assignment:

```powershell
git switch main
git fetch upstream
git merge --ff-only upstream/main
git switch -c be01-week-01
```

Read the current week completely. Complete one task, run its proof and make a focused commit with the task ID first:

```powershell
git add students/BE01/week-01/typescript/inspector.ts
git diff --cached
git commit -m "T01.1 inspect a sandbox event"
git push -u origin be01-week-01
```

One weekly PR may contain the three focused task commits. Include task IDs, test commands/results, a failure case and one explained decision. Review your assigned peer and apply feedback in the same PR.

The primary task path identifies the main artifact. Include necessary companion modules, tests, migrations and notes in the same focused commit. When a task refers to an earlier week, continue that existing application rather than restarting it.

If main is dirty or `--ff-only` fails, inspect the unfinished work or divergence before continuing. Do not force-push main or discard another person's changes. Keep credentials, dependencies, databases and build output out of commits.

## Run your work

Run commands from the repository root, using your actual BE number and file paths:

```powershell
npm.cmd run practice -- students/BE01/week-01/typescript/inspector.ts
npm.cmd run test:practice -- students/BE01/week-03/typescript/validate-event.test.ts
npm.cmd run typecheck
```

`practice` and `test:practice` use tsx to execute TypeScript; they do not check types. Run `typecheck` separately. For the Week 2 intentional type error, capture the expected compiler failure, then restore valid code and rerun the check before committing.

From Week 4, follow the [application wiring guide](12-application-wiring.md). Copy the API starter once, keep `week-04/api/app.ts` as the factory and `server.ts` as the listener, and connect later modules to that app.

```powershell
npm.cmd run dev:student -- BE01
npm.cmd run test:student -- BE01
npm.cmd run test:student:db -- BE01
```

Database tests require the dedicated `_test` database. Tests use separate disposable schemas; individual apps use their own lab schema. Root dependencies support all labs, so do not install another dependency set every week. `npm.cmd test` includes shared/tooling tests and all authored student fast tests present; `npm.cmd run check` verifies the full repository without requiring a database. `npm.cmd run test:db` includes shared and authored student database tests. Targeted commands above help isolate your own failure.

## Add the React client in Week 10

Copy only if the destination does not already exist:

```powershell
Copy-Item -LiteralPath "fixtures/web-starter" -Destination "students/BE01/week-10/client" -Recurse
npm.cmd run dev --prefix students/BE01/week-10/client
```

Keep editing this client in later weeks. Stop the shared UI/API before running your own: they use the same ports, 5173 and 3000. The client uses relative `/api` requests through the supplied proxy.

## Contribute to the shared product

Follow the [rotation plan](06-team-roles.md). Only the assigned build pair promotes reviewed work into `shared/`. Preserve authorship and add a shared suffix to task-ID commits, for example `D03.1 shared add event migration`. Shared code must not import a student's folder.

Other students complete the same practice and review or witness the shared result. Promotion reuses proven work; it is not a second application assigned as extra homework. Record real evidence using the [assessment guide](10-assessment.md).
