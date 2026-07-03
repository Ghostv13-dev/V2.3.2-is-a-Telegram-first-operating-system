// src/policies/moderation.ts
import { PolicyBase } from "./base.ts";

export class ModerationPolicy extends PolicyBase {
  spam_keywords: string[] = [];
  init(cfg?: { spam_keywords?: string[] }) {
    if (cfg?.spam_keywords) this.spam_keywords = cfg.spam_keywords;
  }
  checkContent(text: string) {
    const violations = [] as string[];
    for (const k of this.spam_keywords) {
      if (text.includes(k)) violations.push(k);
    }
    return violations;
  }
}
