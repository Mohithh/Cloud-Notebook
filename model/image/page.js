import mongoose from "mongoose";

const uploadSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    file: {
      data: Buffer,
      contentType: String,
      originalName: String,
    },
  },
  { timestamps: true, collection: "imagecloud" }
);

export default mongoose.models.Upload || mongoose.model("Upload", uploadSchema);
