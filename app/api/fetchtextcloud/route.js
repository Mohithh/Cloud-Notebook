import mongoose from "mongoose";
import testConnect from "@/testConnect/page";
import Contact from "@/model/text/page"; // Your schema

export async function POST(req) {
  try {
    await testConnect();

    const body = await req.json();
    const { email } = body;

    // 🔍 Check for email
    if (!email) {
      return new Response(JSON.stringify({ error: "Email is required." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // 🔍 Fetch all messages by email
const messages = await Contact.find({ email }).sort({ createdAt: -1 });

    // ❗Optional: Handle case where no messages are found
    if (messages.length === 0) {
      return new Response(JSON.stringify({ message: "No data found for this email." }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // ✅ Return the messages
    return new Response(JSON.stringify({ success: true, data: messages }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: "Failed to fetch data", details: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
