
import Order from "@/model/UserLogin/page";
import jwt from "jsonwebtoken";


export const POST = async (req) => {
  try {
    const token = req.headers.get("token");

    if (!token) {
      return new Response(JSON.stringify({
        success: false,
        message: "Token not provided", 
      }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET_);
    } catch (err) {
      return new Response(JSON.stringify({
        success: false,
        message: "Token expired or invalid",
      }), {
        status: 401, // 👈 This tells frontend it's unauthorized
        headers: { "Content-Type": "application/json" },
      });
    }

    // Optional: fetch additional user data
    const orders = await Order.find({ email: decoded.email });

    return new Response(JSON.stringify({
      success: true,
      email: decoded.email,
      orders,
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      message: "Internal server error",
      error: error.message,
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
