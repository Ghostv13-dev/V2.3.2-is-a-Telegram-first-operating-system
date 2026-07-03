#!/usr/bin/env -S deno run --allow-net --allow-env
// One-time webhook registration script
import { setWebhook } from "../src/runtime/webhook_handler.ts";

if (import.meta.main) {
  const url = Deno.env.get("WEBHOOK_URL");
  if (!url) throw new Error("WEBHOOK_URL is not set");
  const res = await setWebhook(url);
  console.log("setWebhook result:", res);
}
