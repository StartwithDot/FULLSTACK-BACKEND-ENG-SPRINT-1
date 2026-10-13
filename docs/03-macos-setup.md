# macOS Setup — MerchantDesk

Use macOS Terminal consistently with the default `zsh` shell. Commands below use `npm`, not `npm.cmd`. Run repository commands from the repository root unless otherwise stated.

## 1. Git and editor (Week 1)

Install Apple's command-line developer tools, which include Git:

```bash
xcode-select --install
```

If the tools are already installed, macOS may tell you that no installation is needed.

Install a free editor such as [VS Code](https://code.visualstudio.com/). Use your GitHub account for collaborator invitations, task branches and pull requests.

Verify Git:

```bash
git --version
```

## 2. Node.js (Week 1)

Install Homebrew if you do not already have it. Follow the official instructions at [brew.sh](https://brew.sh/).

Install Node.js 22.x using Homebrew:

```bash
brew install node@22
```

Homebrew may not automatically put this version on your PATH. For the default Homebrew installation locations on Apple Silicon and Intel Macs, run:

```bash
echo 'export PATH="$(brew --prefix node@22)/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

Verify the installed versions:

```bash
node --version
npm --version
```

The Node.js version must be **22.17 or newer within the 22.x line**. If the version does not meet this requirement, resolve the PATH or installation issue before continuing. Avoid an untested major version and use the committed dependency lockfile.

Next, follow **Set up GitHub** in the student guide (`03-student-guide.md`). After cloning or opening the delivered repository, run these commands from its root:

```bash
npm ci
npm run setup:check
npm run check
```

A starter check is not an assessment answer. It confirms the supplied environment, links, compiler and small scaffolds work.

## 3. Start the supplied shells (Week 1 check)

In the first Terminal tab, from the repository root:

```bash
npm run dev:api
```

Open a second Terminal tab or window, navigate to the same repository root, and run:

```bash
npm run dev:web
```

Open these addresses in your browser:

- UI: http://localhost:5173
- API liveness: http://localhost:3000/health/live

Stop each development process with `Ctrl+C` in its respective Terminal tab.

Neither starter requires PostgreSQL or credentials.

## 4. Native PostgreSQL (inside Week 4)

Install PostgreSQL 17 locally using Homebrew. Docker, virtual machines, managed databases, trials and credit cards are not required.

```bash
brew install postgresql@17
brew services start postgresql@17
```

Add PostgreSQL's command-line tools to your PATH:

```bash
echo 'export PATH="$(brew --prefix postgresql@17)/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

Verify the installation:

```bash
psql --version
```

Connect to your local PostgreSQL server as the `postgres` administrator role if that role exists in your installation:

```bash
psql -h localhost -U postgres -d postgres
```

**macOS note:** Homebrew PostgreSQL installations may initialize with your macOS username as the database superuser rather than a `postgres` role. If the command above fails because the role does not exist, try:

```bash
psql -d postgres
```

If that works, you are connected using your default local PostgreSQL role. Use that existing administrator connection for the following setup.

Inside the `psql` prompt, run these commands only when these new names do not already exist:

```sql
CREATE ROLE merchantdesk LOGIN;
\password merchantdesk
CREATE DATABASE merchantdesk_practice OWNER merchantdesk;
CREATE DATABASE merchantdesk_test OWNER merchantdesk;
CREATE DATABASE merchantdesk OWNER merchantdesk;
\q
```

The password prompt does not put the chosen password in a shell command. These databases are dedicated to the course.

Do not drop, overwrite or repurpose an existing personal database. If a name already exists, ask for a new dedicated name and update the configuration deliberately.

Load the small practice input from the repository root:

```bash
psql -h localhost -U merchantdesk -d merchantdesk_practice -v ON_ERROR_STOP=1 -f fixtures/practice.sql
```

Check the number of events:

```bash
psql -h localhost -U merchantdesk -d merchantdesk_practice -c "SELECT COUNT(*) FROM practice.events;"
```

Expect **6 events**. Re-running the supplied seed is idempotent. It creates only the `practice` schema and is not the final product migration.

## 5. Local configuration and database checks

Create `.env` from `.env.example` only if `.env` does not already exist:

```bash
test -e .env || cp .env.example .env
```

Edit `.env` in your editor and supply your local database password.

Percent-encode characters such as `@`, `:` and `#` in a connection URL, or choose a generated password composed of URL-safe characters. Do not paste your password into chat or commit `.env` to Git.

Run the database checks from the repository root:

```bash
npm run db:check
npm run test:db
```

The first checks connectivity to the practice database. The second requires a database whose name ends in `_test`, creates a random owned test schema and removes only that schema afterward.

**Important:** Do not point the database test command at your product or practice database. The starter tests cover the supplied fixtures; product database tests are added by students.

## 6. Session key (Week 11)

Generate a cryptographically secure key locally:

```bash
node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"
```

Copy the output into `SESSION_KEY` in your ignored `.env` file.

The result is 64 hexadecimal characters representing 32 bytes, not a 64-byte plugin key. Validate that format, then decode it with `Buffer.from(value, 'hex')` before passing it as the session plugin's key.

Missing or malformed keys must fail startup without printing the key value.

`APP_ORIGIN` must be exactly:

```text
http://localhost:5173
```

This is required for the supplied UI/proxy. Do not alternate between `localhost` and `127.0.0.1` in browser URLs.

## 7. Quality commands

Run the curriculum and code-quality checks from the repository root:

```bash
npm run verify:curriculum
npm run typecheck
npm test
npm run build
npm run check
```

Use the formatter after editing:

```bash
npm run format
```

Check formatting before opening a pull request:

```bash
npm run format:check
```

The base check does not require PostgreSQL; the database job runs separately. Later shared product work must also pass its actual database tests.

## Troubleshooting

If a command fails, collect the command you ran, the exact error, your macOS version and what you tried.

Useful environment checks:

```bash
uname -m
sw_vers
node --version
npm --version
git --version
psql --version
```

`uname -m` should normally report `arm64` on your MacBook Air M4.

For common project issues, consult the troubleshooting guide (`09-troubleshooting.md`).