// src/architecture/runtime_pipeline.ts
import type { MessageEvent } from "./event_types.ts";
import { commitAtomic } from "../storage/kv_store.ts";
import { loadPolicies } from "../config/policy_loader.ts";

// ExecutionPlan shapes the outputs to be committed atomically
export interface ExecutionPlan {
  plan_id: string;
  mutations: Record<string, unknown>[];
  outbox_entries: unknown[];
  audit_entries: unknown[];
  aggregate_updates: Record<string, number>;
  queue_items: unknown[];
}

export async function runtimePipeline(event: MessageEvent) {
  // Step 1: Normalize (already normalized by handler)
  // Step 2: Resolve identity — left to caller in most cases

  // Step 3: Permission validation (policy hook)
  const policies = await loadPolicies();
  // policies.checkPermission(...) // TODO

  // Steps 4-6: Route, plan, FSM
  const plan: ExecutionPlan = {
    plan_id: crypto.randomUUID(),
    mutations: [],
    outbox_entries: [],
    audit_entries: [],
    aggregate_updates: {},
    queue_items: [],
  };

  // Example: build a simple audit entry
  plan.audit_entries.push({
    audit_id: crypto.randomUUID(),
    timestamp: Date.now(),
    actor_id: event.user_id ?? 0,
    action: "NOOP",
    resource_id: "",
    old_state: {},
    new_state: {},
    success: true,
  });

  // Step 7: Commit atomically
  const payload = {
    state_mutations: plan.mutations,
    audit_entries: plan.audit_entries,
    aggregate_updates: plan.aggregate_updates,
    outbox_entries: plan.outbox_entries,
    queue_items: plan.queue_items,
  };

  const res = await commitAtomic(payload);
  return { success: res };
}
