# Local AWS Development Environment

This repository contains a fully local AWS backend environment powered by:

- AWS CDK
- LocalStack Pro
- Docker

It allows developers to run and debug the entire cloud system (Lambdas, queues, workflows, storage, and APIs) on their own machine without deploying to AWS.

Start here:
1) Follow the setup steps below
2) Deploy the stack locally
3) Open the LocalStack dashboard:
   https://app.localstack.cloud/inst/default/state


# Contributing Guide

Welcome!
This repository uses a **local cloud development workflow**.
All development happens against a locally emulated AWS environment powered by LocalStack.

We do **not** develop directly in AWS.

The purpose of this process is:

* every change is traceable
* every change is tested
* every change is reviewable
* the environment is reproducible

---

# Core Principles

1. Infrastructure is part of the codebase.
2. Every change must be tied to an issue.
3. No direct commits to `main`.
4. All work goes through Pull Requests.
5. Features are tested locally before review.

---

# Required Setup

Before contributing, you must be able to run the local cloud.

Follow `README.md` and confirm:

You can open:

```
https://app.localstack.cloud/inst/default/state
```

and see deployed resources.

If you cannot deploy the stack locally, you are not ready to open a PR yet.

---

# Development Workflow (GitHub Flow)

We use a strict feature branch workflow.

## Step 1 — Create an Issue

Every change starts with an issue.

Examples:

* bug
* feature
* refactor
* infrastructure change

The issue explains:

* what problem exists
* or what behavior should be added

---

## Step 2 — Create a Branch

Branch names must include the issue number.

Format:

```
<type>/<issue-number>-<short-description>
```

Examples:

```
feat/42-s3-upload-handler
fix/18-step-function-timeout
refactor/73-lambda-structure
infra/11-add-dead-letter-queue
```

---

## Step 3 — Sync and Start Work

```
git checkout main
git pull
git checkout -b feat/42-s3-upload-handler
```

---

## Step 4 — Start the Local Cloud

From the project root:

```
docker compose up
```

Then deploy infrastructure:

```
cdk deploy --all --require-approval never
```

Verify the system is running by opening:

```
https://app.localstack.cloud/inst/default/state
```

---

## Step 5 — Implement and Test

All work must be tested locally.

Typical testing includes:

* uploading files to S3
* sending SQS messages
* invoking lambdas
* running Step Functions
* verifying DB writes
* checking logs

You should be able to demonstrate the feature **without deploying to AWS**.

---

## Step 6 — Commit

We use **Conventional Commits**.

Format:

```
type(scope): short description
```

Examples:

```
feat(lambda): add invoice ingestion handler
fix(queue): prevent duplicate processing
refactor(stepfn): simplify workflow state transitions
docs(readme): update local setup instructions
```

Allowed types:

* feat
* fix
* docs
* refactor
* test
* chore
* ci
* perf

Commit often. Small commits are preferred.

---

## Step 7 — Open a Pull Request

Push your branch:

```
git push -u origin feat/42-s3-upload-handler
```

Then open a Pull Request.

The PR **must reference the issue**:

```
Closes #42
```

Your PR should explain:

* what changed
* how it works
* how it was tested locally

---

# Pull Request Requirements

A PR will only be merged if:

* CI passes
* branch is up to date
* issue is referenced
* the feature works in LocalStack

---

# Review Expectations

Reviewers verify:

1. Code quality
2. Architecture
3. Reproducibility
4. Local behavior

Reviewers should be able to:

```
git checkout your-branch
docker compose up
cdk deploy
```

and observe the feature working locally.

---

# What NOT To Do

Do not:

* commit directly to `main`
* bypass Pull Requests
* test only in AWS
* open a PR without running LocalStack
* merge your own PR without review

---

# Updating Your Branch

Before requesting review:

```
git checkout main
git pull
git checkout your-branch
git rebase main
git push --force-with-lease
```

---

# Debugging Tips

View logs:

```
docker logs localstack-main -f
```

List resources:

```
awslocal cloudformation list-stacks
```

Invoke lambda:

```
awslocal lambda invoke --function-name <name> out.json
```

---

# Why This Process Exists

Cloud systems are difficult to debug after deployment.

This workflow ensures:

* faster iteration
* fewer production issues
* observable behavior
* shared understanding

We are building a **system**, not just writing code.

LocalStack allows the entire backend to run on a developer machine, making infrastructure testable before deployment.

---

# When AWS Is Used

AWS environments are only for:

* staging validation
* integration verification
* production

Daily development happens locally.

---

# Final Note

If you can’t demonstrate your feature locally, it is not ready for review.

The local environment is the source of truth for development.

