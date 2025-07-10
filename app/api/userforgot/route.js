import testConnect from "@/testConnect/page";
import User from "@/model/UserLogin/page";
import CryptoJS from "crypto-js";

export const POST = testConnect(async (req, res) => {
  try {
    const body = await req.json();

    // Check if user exists
    const user = await User.findOne({ email: body.email });

    if (!user) {
      return new Response(
        JSON.stringify({ success: false, error: "Email not found" }),
        { status: 404, headers: { "content-type": "application/json" } }
      );
    }

    // Encrypt new password
    const encryptedPassword = CryptoJS.AES.encrypt(
      body.password,
      process.env.PASSWORD_SECRET_
    ).toString();

    // Update password
    user.password = encryptedPassword;
    await user.save();

    return new Response(
      JSON.stringify({ success: true, message: "Password updated successfully" }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  } catch (error) {
    console.error("FORGOT PASSWORD API ERROR:", error); // Log the error

    return new Response(
      JSON.stringify({ success: false, error: "Server error" }),
      { status: 500, headers: { "content-type": "application/json" } }
    );
  }
});
