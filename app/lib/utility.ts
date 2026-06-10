import { db } from "../db";
import { currentUser } from "@clerk/nextjs/server";

//this function get the user id which can be passed everywhere
const clerkUser = await currentUser();
const result = await db.query(
  "SELECT id from users WHERE clerk_user_id = $1;",
  [clerkUser.id],
);

const Id = result.rows[0]?.id;

async function getResume() {
  const result = await db.query(
    "SELECT raw_text, parsed_json FROM resumes WHERE user_id = $1",
    [Id],
  );

  const resume = result.rows[0];
  return {
    rawText: resume.raw_text,
    parsedJson: resume.parsed_json,
  };
}

export { Id, getResume };
