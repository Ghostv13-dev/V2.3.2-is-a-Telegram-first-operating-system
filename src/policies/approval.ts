// src/policies/approval.ts
import { PolicyBase } from "./base.ts";

export class ApprovalPolicy extends PolicyBase {
  require_approval_for_channel_posts = false;
  init(cfg?: { require_approval_for_channel_posts?: boolean }) {
    if (cfg && cfg.require_approval_for_channel_posts !== undefined)
      this.require_approval_for_channel_posts = cfg.require_approval_for_channel_posts;
  }
  shouldRequireApproval(intent: { action?: string; target?: string }) {
    if (intent.action === "PUBLISH" && intent.target === "CHANNEL")
      return this.require_approval_for_channel_posts;
    return false;
  }
}
