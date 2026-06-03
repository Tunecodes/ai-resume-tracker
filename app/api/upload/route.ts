import { NextResponse } from "next/server";
import pdf from "pdf-parse-new";
import { db } from "@/app/db";
import { currentUser } from "@clerk/nextjs/server";
import { ai } from "@/app/lib/gemini";

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

  //delete previous resume if there is one
  await db.query("DELETE from resumes WHERE user_id = $1;", [userId]);

  //ask ai to convert resume text to json
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `${pdfData.text} change this text resume into json`,
  });

  //send resume to db
  await db.query(
    "INSERT INTO resumes (user_id, file_name, raw_text, parsed_json) VALUES ($1, $2, $3, $4);",
    [userId, "Resume", pdfData.text, response],
  );

  console.log(response.text);

  return NextResponse.json({
    status: 200,
    message: "uploaded resume",
  });
}
