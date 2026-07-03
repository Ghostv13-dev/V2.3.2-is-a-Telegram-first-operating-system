# MIGRATION GUIDE

This guide helps migrate existing code to STOS invariants.

1. Identify code that writes KV or calls Telegram directly — move into Runtime Services.
2. Refactor internal modules to return immutable ExecutionPlan objects, never mutate state.
3. Implement idempotency checks before pipeline execution (store processed update IDs).
4. Ensure all commits are grouped into a single atomic transaction that writes state, audit, aggregates, outbox, and queue.
