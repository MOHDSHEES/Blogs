import mongoose from "mongoose";

// mongoose.set("useCreateIndex", true);
// schema.index({ title: "text" });
const titleSchema = new mongoose.Schema({
  title: [],
});

// productsSchema.index({ name: "text", category: "text" });
const titleModel = mongoose.model("Titles", titlesSchema);

export default titleModel;
