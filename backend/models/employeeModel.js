import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
let nanoid = customAlphabet("1234567890", 10);
const employeeSchema = new mongoose.Schema({
  employeeId: {
    type: String,
    required: true,
    default: () => nanoid(),
    index: { unique: true },
  },
  email: { type: String, unique: true, required: true },
  profileImg: { type: String },
  name: { type: String, required: true },
  jobType: { type: String, required: true },
  address: { type: String, required: true },
  district: { type: String, required: true },
  post: { type: String, required: true },
  joiningDate: { type: String, required: true },
  gender: { type: String, required: true },
  pincode: { type: String, required: true },
  state: { type: String, required: true },
  password: { type: String, required: true },
  status: { type: Number, default: 1 },
  tasks: [{}],
});

// productsSchema.index({ name: "text", category: "text" });
const employeeModel = mongoose.model("Employees", employeeSchema);

export default employeeModel;
