import { NextRequest, NextResponse } from "next/server";
import pdf from "pdf-parse";
import mammoth from "mammoth";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  console.log(buffer)
  console.log(file.arrayBuffer())
  let text = "";


  return NextResponse.json({ success: true, text });
}
