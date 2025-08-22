// app/api/uploadFile/route.ts (Revised)
import { NextRequest, NextResponse } from "next/server";
import pdfParse from "pdf-parse";
import mammoth from "mammoth";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    let text = "";
    let metadata: any = {};

    try {
      if (
        file.type === "application/pdf" ||
        file.name?.toLowerCase().endsWith(".pdf")
      ) {
        const parsed = await pdfParse(buffer);
        text = parsed.text;
        metadata = { numpages: parsed.numpages, info: parsed.info };
      } else if (
        file.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        file.name?.toLowerCase().endsWith(".docx")
      ) {
        const result = await mammoth.extractRawText({ buffer });
        text = result.value;
      } else {
        return NextResponse.json(
          { error: "Unsupported file type. Please upload a PDF or DOCX file." },
          { status: 400 }
        );
      }
    } catch (parseError) {
      console.error("Error parsing file:", parseError);
      return NextResponse.json(
        { error: "Failed to parse file content" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      text,
      ...metadata,
    });
  } catch (error: any) {
    console.error("Error processing upload:", error);
    return NextResponse.json(
      { error: "Failed to process upload", details: error.message },
      { status: 500 }
    );
  }
}