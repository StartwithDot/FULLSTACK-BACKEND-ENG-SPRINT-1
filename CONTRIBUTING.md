# Contributing

1. One focused task purpose per commit, with its stable ID first.
2. One weekly individual PR can hold the three focused task commits.
3. Work only in your BE folder unless assigned shared-build promotion.
4. Do not commit .env, credentials, local databases, dependencies or build output.
5. Shared changes need tests, a non-author check and maintainer review.
6. Preserve student authorship; do not squash when the cohort uses authored commits as evidence.
7. Do not force-push main, overwrite somebody else's work or silently change an applied migration.
8. Writing and diagrams are reviewed for reasoning, not just presence.
9. Use plain hyphens, no em dashes in authored repository text or commit messages.
10. Keep private feedback and answer keys out of the public student repo.

```powershell
npm.cmd run format
npm.cmd run check
```

Product/database work also runs `npm.cmd run test:db`. Student labs run their exact listed test command. Read [the student guide](docs/03-student-guide.md) and [assessment evidence](docs/10-assessment.md).
