import jwt from "jsonwebtoken";
// import config from "./config.js";
import dotenv from "dotenv";
dotenv.config();
const getToken = (user) => {
  return jwt.sign(
    { _id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );
};
const verifyToken = (req, res, next) => {
  //   console.log(req.body.token);
  //   console.log(process.env.JWT_SECRET);
  try {
    var decoded = jwt.verify(req.body.token, process.env.JWT_SECRET, {
      algorithm: "RS256",
    });
    // console.log(decoded);
    if (decoded._id) {
      res.locals.id = decoded._id;
      next();
    } else {
      res.send({ status: 404, msg: "Access forbidden" });
    }
  } catch (error) {
    res.send({ status: 404, msg: "Access forbidden" });
  }
};

export { getToken, verifyToken };