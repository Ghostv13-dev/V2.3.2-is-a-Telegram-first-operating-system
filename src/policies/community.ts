// src/policies/community.ts
import { PolicyBase } from "./base.ts";

export class CommunityPolicy extends PolicyBase {
  auto_approve_joins = false;
  init(cfg?: { auto_approve_joins?: boolean }) {
    if (cfg?.auto_approve_joins) this.auto_approve_joins = cfg.auto_approve_joins;
  }
}
