// src/policies/deployments/enterprise.ts
import { ContentPolicy } from "../content.ts";
import { PermissionPolicy } from "../permission.ts";

export const EnterprisePolicies = {
  content: new ContentPolicy(),
  permission: new PermissionPolicy(),
};
