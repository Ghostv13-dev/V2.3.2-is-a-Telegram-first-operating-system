// src/policies/content.ts
import { PolicyBase, ValidationResult } from "./base.ts";

export interface ContentPolicyConfig {
  max_post_length?: number;
  max_media_per_post?: number;
}

export class ContentPolicy extends PolicyBase {
  config: ContentPolicyConfig = { max_post_length: 4096 };
  init(config?: ContentPolicyConfig) {
    if (config) this.config = { ...this.config, ...config };
  }
  validateContent(text?: string): ValidationResult {
    if (!text) return { allowed: true };
    if (text.length > (this.config.max_post_length ?? 4096)) {
      return { allowed: false, reason: "content_too_long" };
    }
    return { allowed: true };
  }
}
