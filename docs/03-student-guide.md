# Student guide

All ten students complete the same curriculum. Your weekly problem statement points to the canonical instructions in `weeks/`; write answers and code in your own folder.

## Set up GitHub

Accept the collaborator invitation to [StartwithDot/FULLSTACK-BACKEND-ENG-SPRINT-1](https://github.com/StartwithDot/FULLSTACK-BACKEND-ENG-SPRINT-1). The repository owner/admin must arrange Write access before you can push a task branch. Clone the official repository:

```powershell
git clone https://github.com/StartwithDot/FULLSTACK-BACKEND-ENG-SPRINT-1.git
Set-Location -LiteralPath "FULLSTACK-BACKEND-ENG-SPRINT-1"
git config user.name "Your Name"
git config user.email "YOUR_VERIFIED_OR_GITHUB_NOREPLY_EMAIL"
npm.cmd ci
```

`origin` is the official cohort repository. Push only your named task branches and open PRs into its main branch. Do not push directly to main or merge your own PR; a maintainer handles merging after review and checks. These are cohort rules; the owner/admin configures the GitHub access and branch protections.

If you already have a clone or unfinished work, inspect `git status` and `git remote -v` with a maintainer before changing remotes. Do not run git init again or discard existing work. If branch push is denied, ask the owner/admin to confirm your invitation and Write access; do not request anyone's password or token.

## Weekly workflow

Start with a clean main branch. Replace the student ID and week below with your assignment:

```powershell
git switch main
git fetch origin
git merge --ff-only origin/main
git switch -c be01-week-01
```

Read the current week completely. Complete one task, run its proof and make a focused commit with the task ID first:

```powershell
git add students/BE01/week-01/typescript/inspector.ts
git diff --cached
git commit -m "T01.1 inspect a sandbox event"
git push -u origin be01-week-01
```

On GitHub, open a PR in the official repository with base `main` and compare `be01-week-01`. One weekly individual PR may contain the three focused task commits. Include task IDs, test commands/results, a failure case and one explained decision. Review an assigned peer's work; your own PR needs a non-author reviewer. Apply feedback in the same PR. If your reviewer is unavailable, request another reviewer or a maintainer instead of waiting for a fixed partner.

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

Follow the [shared-project responsibilities](06-team-roles.md). Everyone practises all core skills, but the main application is built from different assigned contributions. Each shared task has an available owner, a non-author reviewer, a bounded file scope and required proof. Rotate implementation, test and review responsibilities rather than assigning permanent specialists.

For an assigned shared task, create a separate branch from current main, such as `be01-week-06-shared-migration`, and open a separate PR into main. Reuse reviewed practice, adapt imports into shared modules and include its focused tests. Preserve authorship and use a task-ID commit such as `D03.1 shared add event migration`. Shared code must not import a student's folder.

Record the actual owner, review and PR in the week's contribution log. If an owner is unavailable, a maintainer reassigns the unfinished task and preserves existing work. Continue your own practice; do not wait for that person's code or copy the shared solution as your answer. Keep the shared slot inside the weekly budget: promotion reuses proven work, not a second unrelated assignment. Record evidence using the [assessment guide](10-assessment.md).
