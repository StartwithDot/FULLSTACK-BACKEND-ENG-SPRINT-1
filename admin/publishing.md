# Publishing cohort changes

For maintainers and write collaborators. Students follow the [student guide](../docs/03-student-guide.md), push task branches to the official repository and open PRs into main.

## Official repository

The cohort repository is [StartwithDot/FULLSTACK-BACKEND-ENG-SPRINT-1](https://github.com/StartwithDot/FULLSTACK-BACKEND-ENG-SPRINT-1).

```powershell
git clone https://github.com/StartwithDot/FULLSTACK-BACKEND-ENG-SPRINT-1.git
Set-Location -LiteralPath "FULLSTACK-BACKEND-ENG-SPRINT-1"
npm.cmd ci
```

For an existing collaborator checkout, inspect git status and git remote -v. origin must point to the official URL above. Correct a wrong remote deliberately; do not run git init again. The local folder name does not determine the push destination.

## Review and publish

Start from a clean main, preserving unfinished work before switching branches:

```powershell
git switch main
git fetch origin
git merge --ff-only origin/main
git switch -c docs/clarify-week-instructions
```

Use a meaningful branch name for the actual change. Run the relevant checks, stage only intended files and inspect the diff. For a documentation change:

```powershell
npm.cmd run check
git add -- README.md docs/
git diff --cached
git commit -m "Clarify weekly instructions"
git push -u origin docs/clarify-week-instructions
```

Run npm.cmd run test:db for database-related changes. Open a PR to the official main, inspect the Actions results and merge under repository rules. A branch push alone does not update main. A permitted, reviewed git push origin main also updates main; never bypass protection or force-push if rejected.

## Verify

Confirm the intended files on GitHub's main branch and the hosted checks. Local success does not confirm an Actions run. Preserve student authorship when merging assessed contributions.

Use GitHub's normal sign-in flow; never paste tokens into commands or evidence. An accepted collaborator invitation is required. Ask a maintainer if organization access or branch rules prevent publication.

If Git reports dubious ownership, verify the checkout's absolute path and trust only that specific directory using safe.directory. Never configure a wildcard exception. Keep credentials, dependencies, databases and generated output out of commits.
