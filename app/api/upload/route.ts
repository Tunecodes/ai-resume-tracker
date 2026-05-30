import { NextResponse } from "next/server";
import pdf from "pdf-parse-new";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/app/db";

// Initialize a database connection pool
// (In production, move this configuration block to a separate file like lib/db.ts)
export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Parse the file using the new library engine
    const pdfData = await pdf(buffer);
    const extractedText = pdfData.text;

    // Direct SQL equivalent of Prisma's upsert.
    // CRITICAL: Assumes 'user_id' has a UNIQUE constraint or is the PRIMARY KEY in your table schema.
    const query = `
      INSERT INTO resumes (user_id, raw_text, file_name, updated_at)
      VALUES ($1, $2, $3, NOW())
      ON CONFLICT (user_id) 
      DO UPDATE SET 
        raw_text = EXCLUDED.raw_text,
        file_name = EXCLUDED.file_name,
        updated_at = NOW();
    `;

    const values = [userId, extractedText, file.name];

    // Execute the query safely using parameterized queries to protect against SQL injections
    await db.query(query, values);

    return NextResponse.json({ success: true, fileName: file.name });
  } catch (error) {
    console.error("PDF Parsing Server Error:", error);
    return NextResponse.json(
      {
        error:
          "Internal server error occurred while processing PDF with native pg driver.",
      },
      { status: 500 },
    );
  }
}
