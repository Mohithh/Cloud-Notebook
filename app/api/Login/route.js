import testConnect from "@/testConnect/page";
import User from "@/model/UserLogin/page";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";

export const POST = testConnect(async (req) => {
    try {
        const body = await req.json();
        
        // Validate input
        if (!body.email || !body.password) {
            return new Response(JSON.stringify({ 
                success: false, 
                error: "Email and password are required" 
            }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        const user = await User.findOne({ email: body.email });
        
        if (!user) {
            return new Response(JSON.stringify({ 
                success: false, 
                error: "User not found" 
            }), {
                status: 404,
                headers: { "Content-Type": "application/json" },
            });
        }

        // Decrypt and compare password
        const bytes = CryptoJS.AES.decrypt(user.password, process.env.PASSWORD_SECRET_);
        const userPassword = bytes.toString(CryptoJS.enc.Utf8);

        if (body.password !== userPassword) {
            return new Response(JSON.stringify({ 
                success: false, 
                error: "Invalid password" 
            }), {
                status: 401,
                headers: { "Content-Type": "application/json" },
            });
        }

        // Create token with expiration
        const token = jwt.sign(
            { 
                id: user._id,  // Include user ID
                email: user.email, 
                name: user.name 
            },
            process.env.JWT_SECRET_, 
            { expiresIn: '4d' }  // 4 day expiration
        );

        // Return success response with token
        return new Response(JSON.stringify({ 
            success: true, 
            token,
            user: {
                id: user._id,
                email: user.email,
                name: user.name
            }
        }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });

    } catch (error) {
        console.error("Login error:", error);
        return new Response(JSON.stringify({ 
            success: false, 
            error: "Internal server error" 
        }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
});