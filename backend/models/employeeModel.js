import mongoose from "mongoose";
import { nanoid } from "nanoid";

const employeeSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => nanoid(7),
  },
  email: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  district: { type: String, required: true },
  post: { type: String, required: true },
  joiningDate: { type: String, required: true },
  gender: { type: String, required: true },
  pincode: { type: String, required: true },
  state: { type: String, required: true },
});

// productsSchema.index({ name: "text", category: "text" });
const employeeModel = mongoose.model("Employees", employeeSchema);

export default employeeModel;
