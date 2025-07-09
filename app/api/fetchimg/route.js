import dbConnect from "@/testConnect/page";
import Upload from "@/model/image/page"; // ✅ required for using Upload.find()
import { NextResponse } from "next/server";

export async function GET(req) {
  await dbConnect(); // ✅ ensure MongoDB is connected

  const email = req.nextUrl.searchParams.get("email");

  if (!email) {
    return NextResponse.json({ success: false, message: "Email is required" }, { status: 400 });
  }

  try {
    const uploads = await Upload.find({ email });

    const formatted = uploads.map((item) => ({
      id: item._id,
      originalName: item.file.originalName,
      contentType: item.file.contentType,
    }));

    return NextResponse.json({ success: true, uploads: formatted });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
