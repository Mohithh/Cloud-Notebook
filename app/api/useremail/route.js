
import Order from "@/model/UserLogin/page";
import jwt from "jsonwebtoken";

export const POST = async (req) => {
    try {
        console.log("🔍 Incoming POST request");

        const token = req.headers.get("token");
        console.log("📦 Token received from header:", token);

        if (!token) {
            console.log("❌ No token provided in headers");
            return new Response(JSON.stringify({
                success: false,
                message: "Token not provided",
            }), {
                status: 400,
                headers: {
                    "Content-Type": "application/json",
                },
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_ );
        console.log("✅ Token successfully verified:", decoded);

        const orders = await Order.find({ email: decoded.email });
        console.log("📦 Orders fetched:", orders);

        return new Response(JSON.stringify({
            success: true,
            email: decoded.email,
            orders,
        }), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });

    } catch (error) {
        console.error("❗ Error occurred:", error);

        return new Response(JSON.stringify({
            success: false,
            message: "Token invalid or internal error.",
            error: error.message,
        }), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
};
