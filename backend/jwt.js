import jwt from "jsonwebtoken";
// import config from "./config.js";
import dotenv from "dotenv";

dotenv.config();

// get token for sign in/sinup
const getToken = (user) => {
  return jwt.sign(
    { _id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );
};

// verify token for sign in/sign up
const verifyToken = (req, res, next) => {
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

// get token for password reset link
const getPasswordToken = (email) => {
  return jwt.sign({ email: email }, process.env.JWT_PASSWORD_SECRET, {
    expiresIn: "300s",
  });
};

// verify token for password reset link
const verifyPasswordToken = (req, res, next) => {
  try {
    var decoded = jwt.verify(req.body.token, process.env.JWT_PASSWORD_SECRET, {
      algorithm: "RS256",
    });
    if (decoded.email) {
      res.locals.email = decoded.email;
      next();
    } else {
      res.send({ status: 404, msg: "Access forbidden" });
    }
  } catch (error) {
    res.send({ status: 404, msg: "Access forbidden" });
  }
};

// get token for employee registration link
const getEmployeeToken = (user) => {
  return jwt.sign(
    {
      email: user.email,
      post: user.post,
      joiningDate: user.joiningDate,
      jobType: user.jobType,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "864000s",
    }
  );
};

// verify token for employee registration link
const verifyEmployeeToken = (req, res, next) => {
  try {
    var decoded = jwt.verify(req.body.token, process.env.JWT_SECRET, {
      algorithm: "RS256",
    });
    if (decoded.email) {
      res.locals.data = decoded;
      next();
    } else {
      res.send({ status: 404, msg: "Access forbidden" });
    }
  } catch (error) {
    res.send({ status: 404, msg: "Access forbidden" });
  }
};
export {
  getToken,
  verifyToken,
  getPasswordToken,
  verifyPasswordToken,
  getEmployeeToken,
  verifyEmployeeToken,
};
