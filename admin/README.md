# Maintainer and mentor notes

Student instructions start at the root README and canonical week files. This directory holds material for running and maintaining the cohort.

- [Publishing changes](publishing.md): collaborator remotes, review branches and GitHub checks.
- [PayHook program handoff](payhook-handoff.md): following-sprint architecture and integration contract.
- [Repository tooling](../scripts/README.md): setup, test and consistency commands.

## Run the cohort

Assign bounded shared tasks and non-author reviewers to available students each week. Rotate implementation, test and review ownership using actual contribution records; no permanent specialists or fixed BE-number pairs. Reassign unavailable owners, preserving authored work and keeping individual practice moving. Review authentication, ownership, duplicate handling and migration safety directly. Support concrete blockers without removing core proofs. Keep private grades, answer keys, credentials and individual support records outside this public repository.

The owner/admin grants students Write access for task branches in the official repository and configures main-branch checks and review rules. A collaborator with Write access can review/merge subject to those rules; managing access and branch protections normally requires Admin. The maintainer-merge policy in the student guide needs matching repository configuration if it is to be technically enforced. Do not claim this documentation has configured permissions.

## Maintain the curriculum

The week files are the student-facing instructions. The root curriculum.json records their task metadata for automated checks; it is not another student syllabus. Update both when changing a task. Preserve published task IDs and keep student pointers and contribution logs aligned.

Run npm.cmd run check for every change and npm.cmd run test:db for database-related work. The GitHub workflow exercises Windows/Linux starter checks and PostgreSQL tests; inspect the hosted run after publishing. Branch rules and access permissions are configured by the repository owner.

## Curriculum references

The learning model draws on [Data Sprint's blueprint](https://github.com/StartwithDot/Data-Sprint-1/blob/main/docs/curriculum-blueprint.md) and [Rust Backend Sprint's shared plan](https://github.com/jrk101/Rust-Backend-Sprint-1/blob/main/docs/11-shared-build-plan.md). This repository's tasks, product boundary and pacing are specific to MerchantDesk.
