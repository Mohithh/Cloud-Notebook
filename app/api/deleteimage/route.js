// deleteimage


import { NextResponse } from "next/server";
import Upload from "@/model/image/page";
import dbConnect from "@/testConnect/page";

export async function DELETE(req) {
  await dbConnect();

  const { email, id } = await req.json();

  if (!email || !id) {
    return NextResponse.json(
      { success: false, message: "Email and file ID are required" },
      { status: 400 }
    );
  }

  const file = await Upload.findOne({ _id: id, email });

  if (!file) {
    return NextResponse.json(
      { success: false, message: "File not found or does not belong to user" },
      { status: 404 }
    );
  }

  await Upload.findByIdAndDelete(id);

  return NextResponse.json({ success: true, message: "File deleted successfully" });
}


