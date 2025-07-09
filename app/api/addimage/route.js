// addimage  

import { NextResponse } from "next/server";
import Upload from "@/model/image/page";
import dbConnect from "@/testConnect/page";

export async function POST(req) {
  await dbConnect();

  const formData = await req.formData();
  const email = formData.get("email");
  const file = formData.get("file");

  if (!email || !file) {
    return NextResponse.json({ success: false, message: "Email and file are required" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  const newUpload = new Upload({
    email,
    file: {
      data: buffer,
      contentType: file.type,
      originalName: file.name,
    },
  });

  await newUpload.save();

  return NextResponse.json({ success: true, id: newUpload._id });
}
