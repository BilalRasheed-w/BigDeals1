import nodemailer from "nodemailer";
import Jwt from "jsonwebtoken";
import { asyncHandler, customError } from "../error/globalError.js";
import User from "../models/userM.js";

const sendEmail = async (user) => {
  const token = Jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "30m",
  });
  const url = `http://localhost:5000/reset/${token}`;
  const transporter = nodemailer.createTransport({
    service: process.env.SMTP_SERVICE,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    port: 465,
    host: process.env.SMTP_HOST,
  });

  const mailOptions = {
    from: { name: "BigDeals", address: process.env.SMTP_USER },
    to: user.email,
    subject: "Password Recovery",
    html: `<p>You Have Requested To Rest Your Password</p>
    <p><a href="${url}">Click Here</a> To Reset Your Password</p>
    <p>This Link Will Expire In 30 Min</p>
    <p>Pls Ignore If You Haven't Requested</p>`,
  };

  await transporter.sendMail(mailOptions);
};

const verifyJwt = asyncHandler(async (req, res, next) => {
  const token = req.params.token;
   const decodedData = Jwt.verify(token, process.env.JWT_SECRET);
  if (!decodedData)
    throw new customError("This Link Has Expired, Pls Try Again", 401);
  req.user = await User.findById(decodedData.id);
  next();
});

export { sendEmail, verifyJwt };
