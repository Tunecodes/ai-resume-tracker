import { NextResponse } from "next/server";
import { Webhook } from "svix";
import { headers } from "next/headers";
import { db } from "@/app/db";
import "dotenv/config";

export async function POST(req: Request) {
  try {
    const secret = process.env.CLERK_WEBHOOK;
    console.log(secret);

    if (!secret) {
      throw new Error("Missing CLERK_WEBHOOK_SECRET");
    }

    // 1. Get headers from Clerk
    const headerPayload = await headers();

    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    if (!svix_id || !svix_timestamp || !svix_signature) {
      return NextResponse.json(
        { error: "Missing svix headers" },
        { status: 400 },
      );
    }

    // 2. Get raw body
    const payload = await req.text();

    // 3. Verify webhook
    const wh = new Webhook(secret);

    const event = wh.verify(payload, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as any;
    console.log(event.type);

    // 4. Handle event types
    if (event.type === "user.created") {
      const user = event.data;
      await db.query(
        `
        INSERT INTO users (clerk_user_id, email)
        VALUES ($1, $2)
        ON CONFLICT (clerk_user_id) DO NOTHING;
        `,
        [user.id, user.email_addresses[0]?.email_address],
      );
    }

    if (event.type === "user.deleted") {
      const id = event.data.id;
      await db.query("DELETE FROM users where clerk_user_id = $1;", [id]);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Webhook error:", error);

    return NextResponse.json({ error: "Webhook failed" }, { status: 500 });
  }
}
