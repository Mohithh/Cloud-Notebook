import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const { email, text,subject } = await request.json();

    if (!email || !text) {
      return new Response(
        JSON.stringify({ success: false, error: "Email and message are required" }),
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `Settlesmart_solution <${process.env.GMAIL_USER}>`,
      to: email,
      subject:subject,
      text,
    });

    return new Response(
      JSON.stringify({ success: true, message: "Email sent successfully!" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}
