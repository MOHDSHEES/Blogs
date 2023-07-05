import mongoose from "mongoose";

// mongoose.set("useCreateIndex", true);
// schema.index({ title: "text" });
const blogSchema = new mongoose.Schema({
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
