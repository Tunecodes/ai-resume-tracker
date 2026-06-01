import { NextResponse } from "next/server";
import pdf from "pdf-parse-new";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file" }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const pdfData = await pdf(buffer);

  console.log(pdfData.text);

  return NextResponse.json({
    text: pdfData.text,
  });
}
