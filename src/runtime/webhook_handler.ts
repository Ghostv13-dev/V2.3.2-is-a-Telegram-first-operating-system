// src/runtime/webhook_handler.ts
import { runtimePipeline } from "../architecture/runtime_pipeline.ts";
import type { MessageEvent } from "../architecture/event_types.ts";

export async function setWebhook(url: string) {
  const token = Deno.env.get("BOT_TOKEN");
  if (!token) throw new Error("BOT_TOKEN not set");
  const res = await fetch(`https://api.telegram.org/bot${token}/setWebhook`, {
    method: "POST",
    body: JSON.stringify({ url }),
    headers: { "Content-Type": "application/json" },
  });
  return res.json();
}

export async function webhookHandler(req: Request) {
  // Validate secret before any work
  const secret = Deno.env.get("WEBHOOK_SECRET");
  const provided = req.headers.get("x-webhook-secret");
  if (!secret || provided !== secret) {
    return new Response("", { status: 403 });
  }

  try {
    const payload = await req.json();
    // Convert raw payload -> MessageEvent (simple path)
    const event: MessageEvent = {
      event: "message",
      platform: "telegram",
      chat_id: payload.message?.chat?.id ?? 0,
      user_id: payload.message?.from?.id,
      username: payload.message?.from?.username,
      timestamp: Date.now(),
      text: payload.message?.text,
      raw: payload,
    };

    // Early idempotency check should be performed here (INV-05)

    // Hand off to runtime pipeline
    void runtimePipeline(event);

    // Always return 200 to Telegram (INV-09)
    return new Response("OK", { status: 200 });
  } catch (err) {
    // Return 200 anyway per invariant, but log the error
    console.error("webhook handler error", err);
    return new Response("OK", { status: 200 });
  }
}
