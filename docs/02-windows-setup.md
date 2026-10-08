# Windows setup

Use PowerShell consistently. Commands below use `npm.cmd` to avoid PowerShell blocking `npm.ps1`; no broad execution-policy change is needed. Run repository commands from its root.

## 1. Git and editor (Week 1)

Install [Git for Windows](https://git-scm.com/downloads/win) and a free editor such as [VS Code](https://code.visualstudio.com/). Use a GitHub account for your collaborator invitation, task branches and pull requests.

```powershell
git --version
```

## 2. Node (Week 1)

Install the latest patched **Node 22.x** Windows release from [Node downloads](https://nodejs.org/en/download). The package engine requires Node 22.17 or newer within the 22.x line. Avoid an untested major or a stale patch; use the committed dependency lockfile. Restart PowerShell after installation.

```powershell
node --version
npm.cmd --version
```

Next, follow **Set up GitHub** in the [student guide](03-student-guide.md). After cloning or opening the delivered folder, run from its root:

```powershell
npm.cmd ci
npm.cmd run setup:check
npm.cmd run check
```

A starter check is not an assessment answer. It confirms the supplied environment, links, compiler and small scaffolds work.

## 3. Start the supplied shells (Week 1 check)

```powershell
npm.cmd run dev:api
```

Open a second terminal in the same root:

```powershell
npm.cmd run dev:web
```

Use http://localhost:5173 for the UI and http://localhost:3000/health/live for API liveness. Stop each process with Ctrl+C. Neither starter requires PostgreSQL or credentials.

## 4. Native PostgreSQL (inside Week 2)

Use the free **PostgreSQL 17** Windows installer listed by [PostgreSQL](https://www.postgresql.org/download/windows/). Select the server and command-line tools; pgAdmin is optional. No Docker, WSL, managed database, trial or credit card is required.

If psql is not on PATH:

```powershell
$env:Path += ";C:\Program Files\PostgreSQL\17\bin"
psql.exe --version
```

Connect using the administrator password you chose during installation:

```powershell
psql.exe -h localhost -U postgres -d postgres
```

Inside the psql prompt, run these commands only when these new names do not already exist:

```sql
CREATE ROLE merchantdesk LOGIN;
\password merchantdesk
CREATE DATABASE merchantdesk_practice OWNER merchantdesk;
CREATE DATABASE merchantdesk_test OWNER merchantdesk;
CREATE DATABASE merchantdesk OWNER merchantdesk;
\q
```

The password prompt does not put the chosen password in a shell command. These databases are dedicated to the course. Do not drop, overwrite or repurpose an existing personal database. If a name already exists, ask for a new dedicated name and update configuration deliberately.

Load the small practice input:

```powershell
psql.exe -h localhost -U merchantdesk -d merchantdesk_practice -v ON_ERROR_STOP=1 -f fixtures/practice.sql
psql.exe -h localhost -U merchantdesk -d merchantdesk_practice -c "SELECT COUNT(*) FROM practice.events;"
```

Expect 6 events. Re-running the supplied seed is idempotent. It creates only the `practice` schema and is not the final product migration.

## 5. Local configuration and database checks

```powershell
Copy-Item -LiteralPath ".env.example" -Destination ".env"
```

Do this once; do not overwrite an existing .env. Edit it in your editor and supply your local database password. Percent-encode characters such as @, : and # in a connection URL, or choose a generated password composed of URL-safe characters. Do not paste it in chat.

```powershell
npm.cmd run db:check
npm.cmd run test:db
```

The first checks connectivity to the practice database. The second requires a database whose name ends in `_test`, creates a random owned test schema and removes only that schema afterward. Do not point it at the product or practice database. The starter tests cover the supplied fixtures; product database tests are added by students.

## 6. Session key (Week 8)

Generate a key locally:

```powershell
node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"
```

Copy that output into SESSION_KEY in ignored .env. It is 64 hexadecimal characters representing 32 bytes, not a 64-byte plugin key. Validate that format, then decode with `Buffer.from(value, 'hex')` before passing it as the session plugin's key. Missing or malformed keys must fail startup without printing the value.

APP_ORIGIN must be exactly `http://localhost:5173` for the supplied UI/proxy. Do not alternate localhost and 127.0.0.1 in browser URLs.

## 7. Quality commands

```powershell
npm.cmd run verify:curriculum
npm.cmd run typecheck
npm.cmd test
npm.cmd run build
npm.cmd run check
```

Use `npm.cmd run format` after editing and `npm.cmd run format:check` before a PR. The base check does not require PostgreSQL; the database job runs separately. Later shared product work must also pass its actual database tests.

Ask for setup help with the command, exact error, OS and what you tried. The [troubleshooting guide](09-troubleshooting.md) covers common failures.
