# Evidence and review

Assess behavior, reasoning, safety, tests and reviewability together. A written design must name a choice, a reason and one alternative; a code task must show what fails when the implementation is wrong.

The 45 tasks have explicit proof and traps in their week files. All students follow that essential path. Extra available time permits repetition and more test cases, not a separate career track or a substitute for missing core proof.

## Milestone evidence

| Week | Milestone               | Minimum evidence                                                                                                 |
| ---- | ----------------------- | ---------------------------------------------------------------------------------------------------------------- |
| 1    | Agreed client brief     | A reviewed brief, a safe event summary, and one authored pull request. A non-author reproduces it.               |
| 5    | First local event flow  | A simulator request reaches the API and is visible through a list endpoint. A non-author reproduces it.          |
| 6    | Durable event flow      | A fresh migration, parameterized storage and a restart proof. A non-author reproduces it.                        |
| 9    | Protected merchant flow | A working authenticated event API with cross-merchant rejection. A non-author reproduces it.                     |
| 15   | Independent handover    | A reproducible local product, an honest demo and attributable contribution evidence. A non-author reproduces it. |

For a task PR include ID, path, run command/result, one failure case, reasoning and peer-review link. Do not put credentials in output. For a shared PR include migration/API changes, the witness and the weekly rotation log.

The starter check proves that the supplied learning environment compiles and runs. It does not prove student features exist. The Week 13 database suite must include actual student migration and ownership tests before it can prove those behaviors.

## Review questions

- Which input crosses a trust boundary?
- Does TypeScript check it at runtime?
- What does PostgreSQL enforce instead of application code?
- Does the query derive ownership from the verified operator?
- What happens when the API/database is unavailable?
- Can a peer reproduce the failure and fix?
- Which part did you implement, review or inherit?

Private grades, answer guidance and personal support notes stay outside this public repository. Share task evidence and respectful technical feedback here.
