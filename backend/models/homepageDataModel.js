import mongoose from "mongoose";

// mongoose.set("useCreateIndex", true);
// schema.index({ title: "text" });
const homepageDataSchema = new mongoose.Schema({
  recent: [{}],
  categoryData: {},
});

// productsSchema.index({ name: "text", category: "text" });
const HomepageDataModel = mongoose.model("HomepageData", homepageDataSchema);

export default HomepageDataModel;
