import testConnect from "@/testConnect/page";
import User from "@/model/UserLogin/page";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";

export const POST = testConnect(async (req) => {
    const body = await req.json();
    const user = await User.findOne({ email: body.email });



    if (user) {
        const bytes = CryptoJS.AES.decrypt(user.password, process.env.PASSWORD_SECRET_);
        const userPassword = bytes.toString(CryptoJS.enc.Utf8);

        if (body.password === userPassword) {
            const token = jwt.sign(
                { success: true, email: body.email, name: user.name },
                process.env.JWT_SECRET_, 
                { expiresIn: '1d' }
                
            );

            return new Response(JSON.stringify({ success: true, token }), {
                
                status: 200,
                headers: { "Content-Type": "application/json" },
            });
        } else {
            return new Response(JSON.stringify({ success: false, error: "Invalid password" }), {
                status: 401,
                headers: { "Content-Type": "application/json" },
            });
        }
    }

    // If user not found
    return new Response(JSON.stringify({ success: false, error: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
    });
})