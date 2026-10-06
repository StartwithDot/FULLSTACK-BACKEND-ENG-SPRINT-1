# Student working guide

## One common curriculum

All ten students complete every core skill. A builder/reviewer rotation is temporary responsibility, not a specialisation. Your 15 problem statements link to [canonical weeks](../weeks/week-01.md), so instructions cannot drift between students.

## GitHub setup after publication

Fork the owner/cohort repository, then clone your fork. Replace YOUR_USERNAME and COHORT_OWNER with real values before running:

```powershell
git clone https://github.com/YOUR_USERNAME/Backend-Engineering-Sprint-1.git
Set-Location -LiteralPath "Backend-Engineering-Sprint-1"
git remote add upstream https://github.com/COHORT_OWNER/Backend-Engineering-Sprint-1.git
git config user.name "Your Name"
git config user.email "YOUR_VERIFIED_OR_GITHUB_NOREPLY_EMAIL"
git remote -v
npm.cmd ci
```

Use the email associated with your GitHub account; a verified no-reply address is fine. Shared code and evidence are public when the repo is public, so do not include private learner information.

## Weekly loop

From a clean main branch:

```powershell
git switch main
git fetch upstream
git merge --ff-only upstream/main
git switch -c be01-week-01
```

Before publication or before upstream is configured, omit the fetch/merge lines. Replace BE01 and week numbers throughout with your assignment.

Complete one task, inspect the diff, run its proof and make a focused commit:

```powershell
git add students/BE01/week-01/typescript/inspector.ts
git diff --cached
git commit -m "T01.1 inspect a sandbox event"
git push -u origin be01-week-01
```

Open a PR from your branch to the cohort's main. One weekly PR may contain three separate core-task commits; do not open three PRs just to satisfy a ritual. Put the IDs and proof in its description. Feedback fixes stay on the same branch and PR. Do not force-push main or discard somebody else's changes.

If main is not clean, stop and identify your unfinished changes before switching. If --ff-only fails, read the divergence and ask for help; do not reset the branch.

## Run individual scripts and tests

The root dependencies support small labs without a new install for every week:

```powershell
npm.cmd run practice -- students/BE01/week-01/typescript/inspector.ts
npm.cmd run test:practice -- students/BE01/week-03/typescript/validate-event.test.ts
```

Use your actual file. The compiler checks all student .ts/.tsx files with module isolation; a broken peer's lab should be fixed or excluded through a reviewed decision, not hidden by removing type checking globally. Shared fast tests discover test files under shared/api/test, excluding .db.test.ts files.

## Individual React scaffold (Week 10)

Use the immutable teaching scaffold, not a later completed shared solution. Only copy when your destination does not already exist:

```powershell
Copy-Item -LiteralPath "fixtures/web-starter" -Destination "students/BE01/week-10/client" -Recurse
npm.cmd run dev --prefix students/BE01/week-10/client
```

Root npm ci already installed the necessary React/Vite dependencies. Do not install another version in this folder. Close the shared UI first: both use port 5173 with strictPort. Edit your copied files through Weeks 10-13; later task paths intentionally refer back to week-10/client.

## Practice versus product

A practice path is `students/<student-id>/...`. Student scripts/modules/tests may need companion files, but each commit has one focused task purpose.

The build pair promotes the reviewed result into shared paths. Its commit adds a shared suffix, for example `D03.1 shared add event migration`. Attribute each author's real work and preserve authorship in merge policy.

Everyone's five hours include shared promotion OR review/witness work. Reuse individual results; do not build a second full application as extra homework.

## Evidence

Record commands, relevant outputs, expected failures, one reason and an alternative. Use real links once published or real local commit IDs before publication. Never fabricate successful tests or PR URLs.

See [review evidence](10-assessment.md) and the [rotation plan](06-team-roles.md).
