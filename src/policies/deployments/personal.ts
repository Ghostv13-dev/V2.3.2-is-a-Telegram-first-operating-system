// src/policies/deployments/personal.ts
import { ContentPolicy } from "../content.ts";
import { PermissionPolicy } from "../permission.ts";

export const PersonalPolicies = {
  content: new ContentPolicy(),
  permission: new PermissionPolicy(),
};
