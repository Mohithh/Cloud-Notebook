import mongoose from "mongoose";
import testConnect from "@/testConnect/page";
import Contact from "@/model/text/page"; // Adjust if needed

export async function POST(req) {
  try {
    await testConnect();

    const body = await req.json();
    const { subject, tag, message, email } = body;

    // ✅ Check for all required fields
    if (!subject || !tag || !message || !email) {
      return new Response(JSON.stringify({ error: "All fields are required." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const newMessage = await Contact.create({ subject, tag, message, email });

    return new Response(JSON.stringify({ success: true, data: newMessage }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: "Failed to save data", details: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
