import express from "express";
import path from "path";
import http from "http";
// import config from "./config.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import blogRoute from "./routes/blogRoutes.js";
// import uploadRouter from "./routes/uploadRouter.js";
// import sellerRoutes from "./routes/sellerRoutes.js";
// import emailRoutes from "./routes/emailRoutes.js";
// import paymentRoutes from "./routes/paymentRoutes.js";

const router = express.Router();
const PORT = process.env.PORT || 5000;
// app.use(bodyParser.json());
const __dirname = path.resolve();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dotenv.config();
const mongodbUrl = process.env.MONGODB_URL;
mongoose.connect(mongodbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// .catch((error) => console.log(error));
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.use(express.static(path.join(__dirname, "./frontend/build")));
app.use("/api", blogRoute);
// app.use("/api/uploads", uploadRouter);
// app.use("/api/seller", sellerRoutes);
// app.use("/api", emailRoutes);
// app.use("/api/payment", paymentRoutes);

app.get("*/?1", (req, res) => {
  res.sendFile(path.join(__dirname, "./frontend/build/index.html"));
});

// app.post("/api", async (req, res) => {
//   console.log("test");
//   res.send("working");
// });

const httpServer = http.Server(app);
httpServer.listen(PORT, () => {
  console.log(`Serve at http://localhost:${PORT}`);
});
