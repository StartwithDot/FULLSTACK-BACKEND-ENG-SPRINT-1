# One continuing individual application

From Week 4 onward, keep one MerchantDesk API entry point in students/YOUR_ID/week-04/api. Later week folders hold modules and evidence used by that same app, not a separate server each week.

The shared product still lives in shared/. Promote a reviewed module there only for your assigned shared task, with an agreed file scope and non-author review. Continue your practice app if another shared task is delayed; it must not depend on that person's unfinished branch. Do not copy a completed shared solution back into your practice app.

## Copy the immutable API shell once in Week 4

Run from the repository root. Replace BE01 with your assigned ID. Only copy when week-04/api does not already exist; preserve earlier work otherwise.

```powershell
Copy-Item -LiteralPath "fixtures/api-starter" -Destination "students/BE01/week-04/api" -Recurse
npm.cmd run dev:student -- BE01
```

The copied app supplies liveness only. B01.1 adds the small GET /api/events exercise and its test. The listener stays in server.ts; tests call createApp and app.inject without starting a server.

Use the same command in Weeks 5-15. Stop the shared API before running your own: both use port 3000. The Week 10 client uses the same loopback API address through its development proxy.

## The composition root

Keep week-04/api/app.ts as the place that assembles your app. Keep week-04/api/server.ts as the process entry point. Import later modules into the factory and register each route once.

For example, these imports belong in your original app.ts after the modules are written:

```typescript
import { registerEventRoutes } from '../../week-05/api/events.js';
import { createRepository } from '../../week-06/api/repository.js';
import { registerSession } from '../../week-08/api/session.js';
import { registerLoginRoutes } from '../../week-08/api/login.js';
```

Use .js specifiers for TypeScript module imports in the Node app. Node/tsx resolve the source .ts files; the root compiler verifies them. Do not paste these imports before their files/exports exist.

Agree the small argument types in your own code. createApp accepts injected repository/auth dependencies when tests need them. It must not open a port or require global network/database setup just to be imported.

## How the existing tasks connect

All paths below are relative to students/YOUR_ID/. This table names composition responsibilities, not completed task solutions.

| Week/task                | Existing task artifact                                                  | Connect it to the continuing app                                                                                                                            |
| ------------------------ | ----------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 3, T03.1/E03.1           | week-03/typescript/validate-event.ts and its test                       | Keep the pure boundary exercise reusable; route schema validation remains a separate runtime check                                                          |
| 4, B01.1                 | week-04/api/app.ts plus server.ts/app.test.ts                           | Export createApp; add the first in-memory GET route                                                                                                         |
| 5, B02.1                 | week-05/api/events.ts                                                   | Export registerEventRoutes; replace the Week 4 demonstration GET with this route module, not a second GET at the same path                                  |
| 5, C01.1                 | week-05/client/send-event.ts                                            | Send requests to the server started by dev:student; this file is a consumer, not another listener                                                           |
| 6, D03.1                 | week-06/database/migrations/001-events.sql                              | Keep all later numbered application migrations in this same directory                                                                                       |
| 6, B03.1                 | week-06/api/repository.ts                                               | Export createRepository; inject its database implementation into the existing route module instead of adding another event API                              |
| 6, E06.1                 | week-06/api/persistence.db.test.ts                                      | Import the Week 4 factory, inject the test repository and prove close/rebuild persistence in the same isolated test namespace                               |
| 7, D04.1                 | week-07/database/deduplication.sql                                      | Use the identity SQL as the task artifact and place its reviewed forward migration in week-06/database/migrations/002-event-identity.sql in the same commit |
| 7, T05.1/B04.1           | week-07/typescript/repository-results.ts and week-07/api/list-events.ts | Import the result types/mapping and list-query helper into the repository/route layer; keep one registered list route                                       |
| 8, B05.1                 | week-08/api/login.ts                                                    | Export registerLoginRoutes; place operator DDL in week-06/database/migrations/003-operators.sql and add environment-fed seed tooling                        |
| 8, B05.2                 | week-08/api/session.ts                                                  | Export registerSession; configure the session plugin before routes and provide the verified-principal guard used by event routes                            |
| 9, D05.1/B06.1           | week-09/database/owned-queries.sql and week-09/api/ownership.db.test.ts | Apply owned queries inside the existing repository and test the same assembled app, not an unrelated auth demonstration                                     |
| 9, C02.1                 | week-09/client/send-authenticated.ts                                    | Log in to your original API, then send its cookie and exact allowed Origin; do not add a new server                                                         |
| 10-11, C03/C04           | week-10/client/src/ files                                               | Continue the same copied React client and call relative /api; keep backend authorization in the API                                                         |
| 10-13, B07.1/B08.1/B09.1 | response, boundary and operation task files                             | Extend tests/modules while installing their behavior in the original app/repository; tests must exercise that composition                                   |
| 14-15, E11/E12           | incident and delivery evidence                                          | Document the actual continuing app command, migrations, seed command and tests                                                                              |

Companion edits to app.ts, server.ts, repository.ts, seed code and numbered SQL are part of the same focused task commit. The primary task path is an evidence locator, not a rule forbidding necessary integration edits.

Register the session plugin before routes that use it. In Week 8, remove anonymous access to the assembled event routes; in Week 9, enforce the current verified merchant on every database operation. Do not leave the earlier unauthenticated demonstration route available under a second path.

## Database selection without cross-student writes

Week 2 uses PRACTICE_DATABASE_URL and the separate practice schema. The shared product uses DATABASE_URL and merchantdesk. Individual apps use TEST_DATABASE_URL and lab_be01, lab_be02, etc.

dev:student deliberately overrides the child's DATABASE_URL with TEST_DATABASE_URL and sets DATABASE_SCHEMA to your own lab schema. It never falls back to the shared product URL. If TEST_DATABASE_URL is absent, the early memory app may run but the Week 6 database repository must report missing configuration.

In Week 6, make server.ts pass the runner's DATABASE_URL/DATABASE_SCHEMA to createRepository. The repository must use the chosen schema, not hard-code public or merchantdesk. Validate a schema identifier before placing it in SQL; parameterize ordinary data values.

Apply your current migrations from the original directory:

```powershell
npm.cmd run migrate:practice -- students/BE01/week-06/database/migrations
npm.cmd run dev:student -- BE01
```

The migration command creates the dedicated lab_be01 schema in the test database. Create merchants with an early synthetic seed before inserting events; Week 8 extends that seed with operators. Seed commands read configuration locally, are documented in your NOTES.md and never print credentials.

Before Week 7's uniqueness migration, inspect your existing event rows for repeated merchant/provider identities. Earlier labs may already contain duplicates. Do not silently delete rows or reset a database to make ADD UNIQUE pass: preserve the originals, agree a reconciliation for identical versus conflicting groups with the reviewer, and record it in the forward migration. Test both a fresh schema and an upgrade from a small pre-Week-7 fixture. This is separate from preventing new concurrent duplicates.

Database tests create their own random test schema, apply the same migrations there and inject that repository into createApp. They must not clean the persistent lab schema or depend on someone else's seeded records. Close apps/pools and remove only the namespace created by that test.

## Run all your authored tests

Create each test at its specified task path. Use .test.ts for fast tests and .db.test.ts for real-database tests:

```powershell
npm.cmd run test:student -- BE01
npm.cmd run test:student:db -- BE01
```

The first discovers your fast tests across the week folders. The second requires TEST_DATABASE_URL ending in _test and discovers your database tests. A command reports missing tests until you have written them; it does not invent proof.

For one focused file, the existing test:practice command still works. Keep NOTES.md beside a task when its seed or special proof needs another command.

## Run the individual browser flow in Week 11

Keep the API running with dev:student. In another root terminal:

```powershell
npm.cmd run dev --prefix students/BE01/week-10/client
```

Open http://localhost:5173. Use relative /api URLs, the existing proxy and the same configured APP_ORIGIN. Stop the shared UI first. Cookies are controlled by the server, not copied into browser storage.

Before promotion, rerun your own app flow and tests. When promoting, change imports from cross-week practice paths to shared modules; shared code must never import a student's folder.
