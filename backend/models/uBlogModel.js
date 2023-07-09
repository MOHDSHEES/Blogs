import mongoose from "mongoose";
import { customAlphabet } from "nanoid";

// mongoose.set("useCreateIndex", true);
// schema.index({ title: "text" });

let nanoid = customAlphabet("0123456789abcdefghijklmnopqrstuvwxyz", 10);
const blogSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
    default: () => nanoid(),
    index: { unique: true },
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  mainImg: { type: String, required: true },
  keywords: { type: String, required: true },
  category: { type: String, required: true },
  createdDate: { type: String },
  updatedDate: { type: String },
  views: { type: Number },
  comments: [],
  blog: { type: String, required: true },
  status: { type: String, default: "Inactive" },
  user: { type: String, required: true },
});

// productsSchema.index({ name: "text", category: "text" });
const uBlogModel = mongoose.model("UBlogs", blogSchema);

export default uBlogModel;
