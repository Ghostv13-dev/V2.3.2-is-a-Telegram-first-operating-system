// src/policies/base.ts
export type ValidationResult = { allowed: boolean; reason?: string };

export abstract class PolicyBase {
  abstract init(config?: unknown): Promise<void> | void;
}
