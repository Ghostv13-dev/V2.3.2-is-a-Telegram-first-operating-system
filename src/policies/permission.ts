// src/policies/permission.ts
import { PolicyBase } from "./base.ts";

export type Role = "OWNER" | "MEMBER" | "GUEST";

export class PermissionPolicy extends PolicyBase {
  roles: Record<string, Role> = {};
  init(cfg?: unknown) {
    // load roles from config
  }
  async getRole(actorId: number): Promise<Role> {
    if (actorId === Number(Deno.env.get("OWNER_ID"))) return "OWNER";
    return "GUEST";
  }
  async checkPermission(actorId: number, action: string): Promise<boolean> {
    const role = await this.getRole(actorId);
    if (role === "OWNER") return true;
    // minimal default rules
    if (role === "GUEST") return action === "VIEW";
    return false;
  }
}
