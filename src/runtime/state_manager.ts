// src/runtime/state_manager.ts
import type { ExecutionPlan } from "../architecture/runtime_pipeline.ts";
import { commitAtomic } from "../storage/kv_store.ts";

export async function applyExecutionPlan(plan: ExecutionPlan) {
  // Transform plan to atomic payload shape and commit
  const payload = {
    state_mutations: plan.mutations,
    audit_entries: plan.audit_entries,
    aggregate_updates: plan.aggregate_updates,
    outbox_entries: plan.outbox_entries,
    queue_items: plan.queue_items,
  };
  return commitAtomic(payload);
}
