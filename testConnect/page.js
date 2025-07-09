import mongoose from "mongoose";
import dotenv from "dotenv";      // 🟢 Step 1: import dotenv
dotenv.config();                  // 🟢 Step 2: load your .env.local file

const connectDB = (handler) => async (req, res) => {
  if (mongoose.connections[0].readyState) {
    console.log("✅ Already connected to MongoDB");
    return handler(req, res);
  }

  try {
    console.log("🌐 Trying to connect with URI:", process.env.MONGODB_URI);  // 🛠️ Debug log
    await mongoose.connect("mongodb+srv://mohit:mohityadav6392%40@cluster0.w9emksp.mongodb.net/my_All_data?retryWrites=true&w=majority&appName=Cluster0" || "mongodb://localhost:27017/my_All_data");
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);

    // 🛠️ Fixing: res.status is not a function in Next.js App Router
    return new Response(
      JSON.stringify({ error: "Database connection failed" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  return handler(req, res);
};

export default connectDB;
