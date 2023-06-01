import mongoose from "mongoose";

// mongoose.set("useCreateIndex", true);
// schema.index({ title: "text" });
const blogSchema = new mongoose.Schema({
  title: { type: String, unique: true, required: true },
  mainImg: { type: String, required: true },
  keywords: { type: String, required: true },
  category: { type: String, required: true },
  createdDate: { type: String },
  updatedDate: { type: String },
  views: { type: Number },
  comments: [],
  blog: [],
  user: { type: String, required: true },
});

// productsSchema.index({ name: "text", category: "text" });
const blogModel = mongoose.model("Blogs", blogSchema);

export default blogModel;
