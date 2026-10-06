# Small synthetic teaching inputs

- events.json: six valid event bodies. There is no real customer, card or provider data.
- cases.json: named accept/reject examples for the contract. Students implement and explain validation.
- practice.sql: two merchants and six events in a separate practice schema. Load it into the dedicated practice database, not an existing personal database.
- passwords.ts: supplied async password hashing/verification support for Week 8.
- migration-runner.ts and migrate.ts: supplied Week 6 migration support. Students write the schema and explain the runner, not invent infrastructure plumbing.
- web-starter/: minimal copyable Week 10 React shell, not a solved dashboard.

The event fixture amounts are integer paise. The first three rows belong to merchant-one in SQL, the next three to merchant-two. API ownership comes from authentication, never a submitted merchant_id.

## Password helper

The helper uses Node 22's scrypt with random salts, fixed N=32768/r=8/p=3, 64 MiB maximum memory and timing-safe equal-length comparison. This is one of [OWASP's listed scrypt configurations](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html). It avoids an additional native dependency in the Windows foundation setup.

The stored format is an explicitly versioned local course format, not a general PHC parser. Do not accept cost values from user input. Application login fields remain runtime-validated and bounded. Benchmark on the actual machine; later production work must consider rate limits, concurrency and missing-user timing.

Students study and test this helper, then call it in seed/login code. Do not reuse real passwords for synthetic operators, commit plaintext seed credentials or treat supplied crypto support as personal implementation work.
