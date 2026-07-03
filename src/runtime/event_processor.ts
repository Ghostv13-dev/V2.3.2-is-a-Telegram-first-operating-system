// src/runtime/event_processor.ts
import type { MessageEvent } from "../architecture/event_types.ts";
import { runtimePipeline } from "../architecture/runtime_pipeline.ts";

export async function processEvent(event: MessageEvent) {
  // Wrapper around pipeline: perform idempotency and lock management here
  return runtimePipeline(event);
}
