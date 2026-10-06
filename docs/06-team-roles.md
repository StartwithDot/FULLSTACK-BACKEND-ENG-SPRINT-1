# Team roles and ten-student rotation

The maintainers protect the shared branch, review shared behavior/security and support blockers. Names/dates can be assigned when the cohort is organised; do not invent them in public student records.

## Rotating responsibilities

The build pair promotes the same week's individually practised skill into the product. The next pair reviews or witnesses it. Other students finish the same core tasks and review their assigned peer. Nobody is a permanent frontend, SQL or backend specialist.

| Weeks     | Build pair | Non-author review/witness pair |
| --------- | ---------- | ------------------------------ |
| 1, 6, 11  | BE01, BE02 | BE03, BE04                     |
| 2, 7, 12  | BE03, BE04 | BE05, BE06                     |
| 3, 8, 13  | BE05, BE06 | BE07, BE08                     |
| 4, 9, 14  | BE07, BE08 | BE09, BE10                     |
| 5, 10, 15 | BE09, BE10 | BE01, BE02                     |

Each student builds three times. Per-week evidence files are in [shared/delivery/rotations](../shared/delivery/rotations/week-01.md), so ten people do not repeatedly collide in one shared log.

For individual reviews, use a simple ring: BE01 reviews BE02, BE02 reviews BE03, through BE10 reviewing BE01. Swap a pairing when a conflict of authorship occurs. Builders alternate who makes the main change and who writes its focused tests; both keep their own commits.

The 30-minute shared slot is inside the weekly budget. Rotate the first-pass review lead within the witness pair. Peer review supports learning, but shared auth/ownership/migration changes still need maintainer review.

## Merge and conflict rules

Use PRs and focused task-ID commits. Avoid squash when preserving each student's authored commits is the cohort goal. Required checks and approvals are configured by the repository owner; do not claim branch protection is active before it is configured.

Coordinate file ownership before two contributors edit the same shared module. Do not merge incompatible schema/API decisions and hope a later pair will fix them.

Keep answer guidance, private grades and personal support records outside this public repo. A weekly review explains one failure, one trade-off and one next step, not a ranking of students.
