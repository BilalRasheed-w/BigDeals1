import aws from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";
import { config } from "dotenv";
config();

aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
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

export default upload;
