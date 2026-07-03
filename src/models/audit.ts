// src/models/audit.ts
export interface AuditEntry {
  audit_id: string;
  timestamp: number;
  actor_id: number;
  action: string;
  resource_id: string;
  old_state: Record<string, unknown>;
  new_state: Record<string, unknown>;
  success: boolean;
}
