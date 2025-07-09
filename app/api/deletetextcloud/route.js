import mongoose from "mongoose";
import testConnect from "@/testConnect/page";
import Contact from "@/model/text/page"; // your schema

export async function POST(req) {
  try {
    await testConnect();

    const { _id, email } = await req.json();

    if (!_id || !email) {
      return new Response(JSON.stringify({ error: "Both _id and email are required." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const record = await Contact.findOne({ _id, email });

    if (!record) {
      return new Response(JSON.stringify({ error: "No matching record found." }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    await Contact.deleteOne({ _id });

    return new Response(JSON.stringify({ success: true, message: "Record deleted successfully." }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: "Failed to delete", details: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
