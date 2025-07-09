import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    subject: { type: String, required: true },
    tag: { type: String, required: true },
    message: { type: String, required: true },
    email: { type: String, required: true }, 
  },
  {
    timestamps: true,
    collection: "textcloud", // 👈 Force collection name
  }
);

const Contact = mongoose.models.Contact || mongoose.model("Contact", contactSchema);

export default Contact;
