import { NextResponse } from "next/server";
import pdf from "pdf-parse-new";
import { db } from "@/app/db";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file" }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const pdfData = await pdf(buffer);

  //get logged in user
  const clerkUser = await currentUser();
  const result = await db.query(
    "SELECT id from users WHERE clerk_user_id = $1;",
    [clerkUser.id],
  );

  const userId = result.rows[0]?.id;
  //send resume to db
  await db.query(
    "INSERT INTO resumes (user_id, file_name, raw_text) VALUES ($1, $2, $3);",
    [userId, "Resume", pdfData],
  );

  return NextResponse.json({
    status: 200,
    message: "uploaded resume",
  });
}
