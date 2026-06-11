import { db } from "../db";
import { auth } from "@clerk/nextjs/server";

export async function getUserId() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const result = await db.query(
    "SELECT id FROM users WHERE clerk_user_id = $1",
    [userId],
  );

  return result.rows[0]?.id;
}

export async function getResume() {
  const userId = await getUserId();

  const result = await db.query(
    "SELECT raw_text, parsed_json FROM resumes WHERE user_id = $1",
    [userId],
  );

  const resume = result.rows[0];

  return {
    rawText: resume.raw_text,
    parsedJson: resume.parsed_json,
  };
}
