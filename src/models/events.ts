// src/models/events.ts
export interface OutboxEntry {
  outbox_id: string;
  target_chat_id: number;
  message_text: string;
  buttons?: unknown[];
  created_at: number;
  status: "STAGED" | "SENT" | "FAILED";
}
