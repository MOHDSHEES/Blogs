import mongoose from "mongoose";

// mongoose.set("useCreateIndex", true);
// schema.index({ title: "text" });
const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  mainImg: { type: String, required: true },
  category: { type: String, required: true },
  comments: [],
  blog: [],
});

// productsSchema.index({ name: "text", category: "text" });
const blogModel = mongoose.model("Blogs", blogSchema);

export default blogModel;
