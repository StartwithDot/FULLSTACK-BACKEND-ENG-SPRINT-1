# Work with the official cohort repository

The main cohort repository is [StartwithDot/FULLSTACK-BACKEND-ENG-SPRINT-1](https://github.com/StartwithDot/FULLSTACK-BACKEND-ENG-SPRINT-1). Use it for cohort changes going forward, not the earlier personal repository.

## Student and collaborator remotes are different

Students follow the [student guide](03-student-guide.md): origin is their own fork and upstream is the StartwithDot repository. They push a task branch to their fork and open a PR to StartwithDot/main.

Write collaborators may use the official repository as origin and push a review branch there. An accepted invitation and Write access are required; repository rules may require a PR before main is updated.

The delivered local folder can retain the name Backend-Engineering-Sprint-1. That directory name does not determine which GitHub repository receives a push.

## Existing collaborator checkout

From the delivered folder, inspect the remotes and branch first:

```powershell
Set-Location -LiteralPath "C:\Users\josep\Documents\Codex\2026-09-22\hey\outputs\Backend-Engineering-Sprint-1"
git status --short --branch
git remote -v
```

For this checkout, origin should be https://github.com/StartwithDot/FULLSTACK-BACKEND-ENG-SPRINT-1.git. If it is wrong, correct it deliberately:

```powershell
git remote set-url origin https://github.com/StartwithDot/FULLSTACK-BACKEND-ENG-SPRINT-1.git
```

If there is no origin, use git remote add origin followed by that plain URL instead. A personal remote may be retained for reference; do not push to it by accident.

Do not run git init again or create another empty repository for an existing checkout.

## Review and publish a change

Start from a clean main. Save or finish unrelated work before switching branches. Fast-forward the official main; stop and inspect if Git reports divergence.

```powershell
git switch main
git fetch origin
git merge --ff-only origin/main
git switch -c clarify-cohort-integration
```

Use a meaningful new branch name for your actual change. Make the changes, run their relevant checks and inspect staged files:

```powershell
npm.cmd run check
git add .
git diff --cached --stat
git diff --cached
git commit -m "Clarify PayHook handoff and student app wiring"
git push -u origin clarify-cohort-integration
```

Open a PR to StartwithDot/main, inspect its Actions checks and merge through the repository's review rules. A branch push alone does not update the main cohort page. Do not commit .env, passwords, dependencies, database files or generated dist folders.

Where main pushes are permitted and the change is already reviewed, git push origin main updates the official main. Do not bypass branch protection or use force-push if that command is rejected.

## Fresh collaborator checkout

```powershell
git clone https://github.com/StartwithDot/FULLSTACK-BACKEND-ENG-SPRINT-1.git
Set-Location -LiteralPath "FULLSTACK-BACKEND-ENG-SPRINT-1"
npm.cmd ci
npm.cmd run setup:check
npm.cmd run check
```

Set your own repository-local author name/email if needed. Follow Git's browser sign-in; never paste tokens or passwords into commands or public evidence. GitHub may require organization SSO authorization.

## Ownership exception

If Git reports the sandbox/user ownership mismatch for this exact trusted delivered folder, add only that directory:

```powershell
git config --global --add safe.directory "C:/Users/josep/Documents/Codex/2026-09-22/hey/outputs/Backend-Engineering-Sprint-1"
```

Do not trust every directory with a wildcard. For a different trusted checkout, use its exact resolved path.

## Verify the result

Open the official repository's main branch after the PR is merged or a permitted main push succeeds. Confirm the changed files and inspect the hosted starter/database jobs. Local checks cannot confirm a hosted Actions run.

If PowerShell says "not a git repository", return to the actual checkout. A commit message belongs after git commit -m; it is not a branch name to push.

Maintainers configure mentor access, Actions permissions and branch rules. A collaborator without administration permission should ask the maintainer, not try to bypass those controls. No paid runners or cloud account are required.
