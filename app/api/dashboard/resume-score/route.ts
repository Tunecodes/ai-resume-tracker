import { NextResponse } from "next/server";
import { getResumeScore } from "@/app/lib/dashboard/resume-score";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "unauthorized", status: 401 });
  }
  try {
    const score = await getResumeScore();
    return NextResponse.json({ score });
  } catch (err) {
    return NextResponse.json({ error: "Failed to get score" }, { status: 500 });
  }
}
