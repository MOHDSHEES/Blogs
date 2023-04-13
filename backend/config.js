export default {
  MONGODB_URL: process.env.MONGODB_URL || "mongodb://0.0.0.0/blogdb",
  JWT_SECRET: process.env.JWT_SECRET || "thisissecretnoonecansee",
};
