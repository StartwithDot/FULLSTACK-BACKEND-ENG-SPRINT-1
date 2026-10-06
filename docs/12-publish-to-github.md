# Publish this folder to GitHub

The delivered folder is local. No repository, commit, branch or push has been created for you.

## 1. Review the cohort

Read README.md, Week 1, the task index and the weekly map. From the folder below, run npm.cmd ci and npm.cmd run check. Also run the database checks after completing the PostgreSQL setup. Do not commit .env, passwords, node_modules or generated dist folders.

## 2. Create an empty GitHub repository

Sign in to GitHub and choose New repository. Use **Backend-Engineering-Sprint-1** under your account or the cohort account you control. Public is suitable for a public cohort.

Do not select Add README, .gitignore or license here; the local files are the initial content. A license is a separate ownership decision, not assumed permission to redistribute either reference repository's code.

Copy the HTTPS repository URL. The example below uses jrk101; replace it if publishing under another owner.

## 3. Initial local commit and push

Paste commands as plain text in PowerShell. URLs inside commands must not contain Markdown brackets.

```powershell
Set-Location -LiteralPath "C:\Users\josep\Documents\Codex\2026-09-22\hey\outputs\Backend-Engineering-Sprint-1"
git init
git branch -M main
git status --short
git add .
git diff --cached --stat
git commit -m "Create 15 week backend engineering cohort"
git remote add origin https://github.com/jrk101/Backend-Engineering-Sprint-1.git
git remote -v
git push -u origin main
```

Inspect the staged files before the commit. If Git needs your author name/email, set them for this repository, not somebody else's identity:

```powershell
git config user.name "Your Name"
git config user.email "YOUR_VERIFIED_OR_GITHUB_NOREPLY_EMAIL"
```

Then repeat the commit and push. Follow Git's browser sign-in when prompted. Never paste tokens or passwords into public commands, commits or chat.

## Ownership exception if Git reports dubious ownership

If this exact delivered folder is trusted and Git reports the sandbox/user ownership mismatch, add only this directory:

```powershell
git config --global --add safe.directory "C:/Users/josep/Documents/Codex/2026-09-22/hey/outputs/Backend-Engineering-Sprint-1"
```

Then retry the failed Git command. Do not trust every directory with a wildcard.

## Remote fixes

If origin already exists, inspect git remote -v first. To correct this repository's URL:

```powershell
git remote set-url origin https://github.com/jrk101/Backend-Engineering-Sprint-1.git
git push -u origin main
```

If the remote already contains commits, do not force-push. Stop and decide how to preserve those files. If PowerShell says "not a git repository", return to the exact folder using Set-Location.

A commit message is not a branch name. Use git commit -m for the message and git push origin main for the main branch.

## 4. Verify publication

Open the repository's main branch. Confirm README, weeks/week-15.md, all ten student folders and package-lock.json are visible. Open Actions and inspect the starter-check and database jobs. The local checks cannot confirm a hosted Actions run.

A pushed feature branch does not automatically update main. If you choose review branches later, merge their reviewed PRs before expecting main to show the changes.

Choose Settings > Actions permissions if the workflow is disabled. Standard GitHub-hosted Actions usage in public repositories has a free path; private repositories have plan quotas. Do not enable paid larger runners for this course. See [Actions limits](https://docs.github.com/en/actions/reference/limits).

Set mentor permissions, assign BE01-BE10 and optionally require passing checks/review in repository rules. These owner settings are not created by the local files.

For later updates, review the diff, run checks, commit a focused change and push the actual branch. Keep main as the coherent cohort material.
