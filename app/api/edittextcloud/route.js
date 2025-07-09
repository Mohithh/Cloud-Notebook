import testConnect from "@/testConnect/page";
import Contact from "@/model/text/page"; // your schema

export async function POST(req) {
  try {
    await testConnect();

    const { _id, email, subject, tag, message } = await req.json();

    // Validate input
    if (!_id || !email || !subject || !tag || !message) {
      return new Response(JSON.stringify({ error: "All fields are required." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Check if the record exists
    const record = await Contact.findOne({ _id, email });

    if (!record) {
      return new Response(JSON.stringify({ error: "No matching record found." }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Update the record
    record.subject = subject;
    record.tag = tag;
    record.message = message;
    record.updatedAt = new Date();

    await record.save();

    return new Response(JSON.stringify({ success: true, message: "Record updated successfully." }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: "Update failed", details: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
