# Repository tooling

These small Node scripts back the npm commands used by students and GitHub Actions. They are development tools, not MerchantDesk features or extra syllabus. Run commands from the repository root; students do not need to edit the helpers.

| Command                             | Purpose                                                             |
| ----------------------------------- | ------------------------------------------------------------------- |
| npm.cmd run setup:check             | Check Node, Git and installed root dependencies                     |
| npm.cmd run db:check                | Check the dedicated Week 2 practice database and fixture count      |
| npm.cmd run check                   | Validate curriculum/links, formatting, types, fast tests and builds |
| npm.cmd run test:db                 | Run shared and authored student DB tests in a dedicated _test DB    |
| npm.cmd run dev:student -- BE01     | Start one student's continuing API with an isolated lab schema      |
| npm.cmd run test:student -- BE01    | Discover that student's fast tests across their week folders        |
| npm.cmd run test:student:db -- BE01 | Run that student's isolated database tests                          |

run-tests.mjs is the common test launcher. Without a student ID, it includes shared/tooling tests and all authored student tests already present. Empty student folders need no placeholder test. `npm.cmd run check` and the existing CI therefore catch a broken student fast test; `test:db` includes authored student DB tests. Targeted commands still run only the chosen student.

test-files.mjs discovers test files, and student-context.mjs validates student IDs and database selection. Fast and database tests are separate; a test database must never silently fall back to the product database. Database tests must each use their own random schema so the cohort suite can run them together safely.

check-curriculum.mjs checks the 15 weeks, 45 task IDs, student pointers, metadata, local links and text conventions. Keep it in CI when editing the curriculum. Its task data comes from curriculum.json; canonical week files remain the instructions students follow.

Tooling tests live in test/. Product tests live in shared/api/test/. Migration and password support stay in fixtures/ and shared/api/src/support/ because students use and test those helpers during the course.
