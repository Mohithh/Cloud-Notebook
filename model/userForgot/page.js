import mongoose from "mongoose";

const userForgotSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const UserForgot =
  mongoose.models.UserForgot || mongoose.model("UserForgot", userForgotSchema);

export default UserForgot;
