// fetchemail
import { NextResponse } from "next/server";
import Upload from "@/model/image/page";
import dbConnect from "@/testConnect/page";

export async function GET(req) {
  await dbConnect();

  const email = req.nextUrl.searchParams.get("email");
  if (!email) {
    return NextResponse.json({ success: false, message: "Email is required" }, { status: 400 });
  }

const files = await Upload.find({ email }).sort({ createdAt: -1 });

  const result = files.map((f) => ({
    id: f._id,
    originalName: f.file.originalName,
    contentType: f.file.contentType,
    base64: `data:${f.file.contentType};base64,${f.file.data.toString("base64")}`,
  }));

  return NextResponse.json({ success: true, uploads: result });
}
