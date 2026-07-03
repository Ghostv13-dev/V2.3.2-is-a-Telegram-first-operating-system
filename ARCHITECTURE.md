# STOS V2.3.2 — Architecture Contract
This document is the authoritative architecture contract for STOS v2.3.2.
It defines the 3-layer model, the 13-step runtime pipeline, invariants, and
storage layout. Do NOT change these invariants without a major version bump.

## 1. System Layers
 * **Layer 1 — Internal Modules:** Intent generators only. Never mutate state.
 * **Layer 2 — Runtime Services:** 13-step pipeline. The *only* layer authorized for state mutation.
 * **Layer 3 — External Tools:** Side-effect executors only (Telegram API, Deno KV/Queue).

## 2. 13-Step Runtime Pipeline
Every event must pass through these steps in strict sequence:
 1. Event ingestion
 2. Identity resolution
 3. Permission validation
 4. Route resolution
 5. Execution planning
 6. FSM processing
 7. KV atomic commit
 8. Outbox management
 9. Queue processing
 10. Delivery coordination
 11. Audit recording
 12. Idempotency control
 13. Lock management

## 3. Storage Prefixes (Deno KV)
Persistent state is strictly isolated via these namespaces:
 * storage/system/*
 * storage/owner/*
 * storage/users/*
 * storage/groups/*
 * storage/channels/*
 * storage/posts/{drafts,scheduled,published,archived}/*
 * storage/audit/*
 * storage/outbox/*
 * storage/queue/*
 * storage/locks/*
 * storage/idempotency/*

## 4. Atomic Commit Model
Every pipeline run must commit exactly these five outputs atomically:
 * state_mutations: FSM positions and system state changes.
 * audit_entries: Immutable logs of every operation.
 * aggregate_updates: Counter increments/metrics.
 * outbox_entries: Staged messages for Telegram.
 * queue_items: Delivery work units for background processing.

## 5. Critical Invariants
 * **INV-01:** All mutations commit in one atomic transaction.
 * **INV-02:** Internal modules produce intent only; they never mutate state.
 * **INV-03:** Runtime Services (Layer 2) are the *only* layer permitted to execute mutations.
 * **INV-05:** Idempotency check occurs before execution to prevent duplicate processing.
 * **INV-06:** Lock acquired before FSM processing to ensure concurrency safety.
 * **INV-08:** Single-owner governance (singleton).
 * **INV-10:** Webhook secret token is validated before pipeline entry.
 * **INV-12:** Pipeline steps execute in fixed sequential order.
 * **INV-13:** Telegram is an output surface only; it never drives the FSM directly.

*If code diverges from this specification, the code is wrong.*
