// src/architecture/invariants.ts
export const INV = {
  ALL_MUTATIONS_ATOMIC: "INV-01",
  MODULES_INTENT_ONLY: "INV-02",
  RUNTIME_ONLY_MUTATIONS: "INV-03",
  OUTBOX_IN_COMMIT: "INV-04",
  IDEMPOTENCY_EARLY: "INV-05",
  LOCK_BEFORE_FSM: "INV-06",
};

export function checkInvariant(name: string) {
  // Placeholder: runtime asserts should call these checks at strategic points
  // Implement more detailed validators per invariant as needed.
  return true;
}
