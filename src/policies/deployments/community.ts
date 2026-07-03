// src/policies/deployments/community.ts
import { ContentPolicy } from "../content.ts";
import { PermissionPolicy } from "../permission.ts";

export const CommunityPolicies = {
  content: new ContentPolicy(),
  permission: new PermissionPolicy(),
};
