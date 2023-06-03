import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
let employeeId = customAlphabet("1234567890", 10);
const employeeSchema = new mongoose.Schema({
  employeeId: {
    type: String,
    required: true,
    default: () => employeeId,
    index: { unique: true },
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
