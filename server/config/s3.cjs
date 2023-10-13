// import aws from "aws-sdk";
// import multer from "multer";
// import multerS3 from "multer-s3";
// import path from "path";
// import path from "path";
// import { config } from "dotenv";
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const path = require("path");
const dotenv = require("dotenv");
const envPath = path.resolve(__dirname, "../.env");
dotenv.config({ path: envPath });

console.log(process.env.AWS_KEY);

aws.config.update({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
  region: process.env.AWS_REG,
});

const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    bucket: process.env.AWS_BUCKET,
    s3,
    key: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
    },
  }),
});

// export default upload;
module.exports = upload;
