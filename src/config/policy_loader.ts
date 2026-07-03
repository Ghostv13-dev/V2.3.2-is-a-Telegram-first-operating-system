// src/config/policy_loader.ts
import { CommunityPolicies } from "../policies/deployments/community.ts";

export async function loadPolicies() {
  // Simplified loader: select policy set by env
  const mode = Deno.env.get("POLICY_MODE") ?? "community";
  switch (mode) {
    case "enterprise":
      return (await import("../policies/deployments/enterprise.ts")).EnterprisePolicies;
    case "personal":
      return (await import("../policies/deployments/personal.ts")).PersonalPolicies;
    default:
      return CommunityPolicies;
  }
}
