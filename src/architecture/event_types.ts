// src/architecture/event_types.ts
export type Platform = "telegram";

export interface BaseEvent {
  event: string;
  platform: Platform;
  chat_id: number;
  user_id?: number;
  username?: string;
  timestamp: number;
}

export interface MessageEvent extends BaseEvent {
  text?: string;
  raw?: unknown;
}
